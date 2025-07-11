// ticketDashboard.js
import { LightningElement, wire } from 'lwc';
import getRecentTickets from '@salesforce/apex/SupportTicketController.getRecentTickets';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import ChartJS from '@salesforce/resourceUrl/ChartJS';
import { loadScript } from 'lightning/platformResourceLoader';

export default class TicketDashboard extends NavigationMixin(LightningElement) {
    chartRendered = false;
    chart; // Chart nesnesi

    @wire(getRecentTickets)
    wiredTicketsResult;

    get tickets() {
        const data = this.wiredTicketsResult?.data;
        return data?.map(ticket => {
            let styleClass = '';
            switch (ticket.Priority__c) {
                case 'High': styleClass = 'high-priority'; break;
                case 'Medium': styleClass = 'medium-priority'; break;
                case 'Low': styleClass = 'low-priority'; break;
            }
            return { ...ticket, styleClass };
        });
    }

    get statusCounts() {
        const counts = {};
        this.wiredTicketsResult?.data?.forEach(ticket => {
            const status = ticket.Status__c || 'Unknown';
            counts[status] = (counts[status] || 0) + 1;
        });
        return counts;
    }

    handleSuccess(event) {
        const updatedId = event.detail.id;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Status Updated',
                message: `Ticket ${updatedId} was updated successfully.`,
                variant: 'success',
            })
        );
        refreshApex(this.wiredTicketsResult);
    }

    navigateToRecord(event) {
        const ticketId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: ticketId,
                objectApiName: 'Support_Ticket__c',
                actionName: 'view',
            },
        });
    }

    renderedCallback() {
        if (this.chartRendered) {
            return;
        }
        setTimeout(() => {
            this.chartRendered = true;
            loadScript(this, ChartJS)
            .then(() => {
                const ctx = this.template.querySelector('canvas').getContext('2d');
                const labels = Object.keys(this.statusCounts);
                const data = Object.values(this.statusCounts);
                console.log(data); // Debugging output

                this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                    label: 'Ticket Status Counts',
                    data: data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    }],
                },
                options: {
                    responsive: true,
                    scales: {
                    y: {
                        beginAtZero: true
                    }
                    }
                }
                });
            })
            .catch(error => {
                console.error('Error loading ChartJS:', error);
            });
        }, 1000);

    }
}