# Salesforce Ticket Dashboard 📊

A dynamic Lightning Web Component (LWC) built for Salesforce to visualize support tickets with interactive cards, inline status editing, and a responsive Chart.js bar graph.

## 🔧 Features

- 🎨 Color-coded ticket cards by priority with hover animations
- 📝 Inline status update via `lightning-record-edit-form`
- 🧭 Record navigation on card click
- 📊 Bar chart visualization of ticket statuses using Chart.js
- ✅ Real-time updates using Apex and Lightning Data Service

## 💻 Technologies Used

- Salesforce Apex Controller (`SupportTicketController.cls`)
- LWC (Lightning Web Components)
- Chart.js (via Static Resource)
- SLDS (Salesforce Lightning Design System)
- JavaScript (with render timing optimization using `setTimeout()`)

## 🚀 Setup Instructions

1. Upload Chart.js as a static resource (file: `chart.umd.min.js`)
2. Deploy the LWC component and Apex class to your Salesforce org
3. Add `ticketDashboard` to a Lightning App or Record Page using App Builder
4. Ensure the `Support_Ticket__c` object has the appropriate fields:  
   - `Subject__c` (Text)  
   - `Priority__c` (Picklist: High, Medium, Low)  
   - `Status__c` (Picklist: New, In Progress, Resolved)


## 🧭 Author

**Fahri Türkmen** – Junior Salesforce Developer  
_Connect with me on [LinkedIn](https://www.linkedin.com/in/fahriturkmen)_

## 📝 License

This project is licensed under the MIT License.