import moment from 'moment'

const numberToWords = (num) => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num === 0) return "Zero Rupees only";

    const convert = (n) => {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
        if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + convert(n % 100) : "");
        return "";
    };

    return convert(num) + " Rupees only";
};

export default function (
   { name,
      address,
      phone,
      email,
      dueDate,
      date,
      id,
      notes,
      subTotal,
      type,
      vat,
      total,
      items,
      status,
      totalAmountReceived,
      balanceDue,
      selectedCompany,
      client,
      invoiceNumber
   }) {
    debugger;

    let discountSum = 0, taxSum = 0, subtotalSum = 0;

return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .invoice-container {
            max-width: 800px;
            background: #fff;
            padding: 40px;
            box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
            border-radius: 15px;
            margin: auto;
            position: relative;
            overflow: hidden;
        }
        .invoice-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 10px;
            background: linear-gradient(90deg, #ff7e5f, #feb47b);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        .header h2 {
            font-size: 28px;
            color: #333;
            margin: 0;
        }
        .invoice-details {
            text-align: right;
        }
        .invoice-details p {
            margin: 5px 0;
            color: #666;
        }
        .status {
            font-weight: bold;
            color: #ff4d4d;
        }
        .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .invoice-info div {
            width: 48%;
        }
        .invoice-info h4 {
            margin: 0 0 10px 0;
            color: #ff7e5f;
            font-size: 18px;
        }
        .invoice-info p {
            margin: 0;
            color: #555;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .table th, .table td {
            border: 1px solid #ddd;
            padding: 15px;
            text-align: left;
        }
        .table th {
            background: linear-gradient(90deg, #ff7e5f, #feb47b);
            color: white;
            font-weight: bold;
        }
        .table td {
            background: #f9f9f9;
        }
        .summary {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            padding-left: 210px;

        }
        .summary-box {
            width: 48%;
            padding: 20px;
            border: 1px solid #ddd;
            background: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
        }
        .summary-box h4 {
            margin: 0 0 15px 0;
            color: #ff7e5f;
            font-size: 18px;
        }
        .summary-box p {
            margin: 5px 0;
            color: #555;
        }
        .amount {
            font-weight: bold;
            color: #ff4d4d;
        }
        .note {
            margin-top: 30px;
            font-style: italic;
            color: #777;
            text-align: center;
        }
        .note strong {
            color: #ff7e5f;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div>
                <h2>Invoice</h2>
            </div>
            <div class="invoice-details">
                <p>NO: <span class="status">${invoiceNumber}</span></p>
                <p>DATE: ${moment(date).format('LL')}</p>
            </div>
        </div>
        
        <div class="invoice-info">
            <div>
                <h4>BILL TO:</h4>
                <p>${client.name}</p>
                <p>${email || "N/A"}</p>
                <p>${phone || "N/A"}</p>
            </div>
            <div>
                <h4>DUE DATE:</h4>
                <p>DATE: ${moment(dueDate).format('LL')}</p>
            </div>
        </div>
        
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>HSN/SAC</th>
                    <th>Quantity</th>
                    <th>Price/Unit</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${items.map((item, index) => {
                    let unitPrice = item.unitPrice ?? 0;
                    let quantity = item.quantity ?? 0;
                    let discountPer = item.discountPer ?? 0;
                    let tax = item.tax ?? 0;
    
                    let itemTotal = unitPrice * quantity;
                    let itemDiscount = (itemTotal * discountPer) / 100;
                    let itemTax = (itemTotal * tax) / 100;
                    let itemSubtotal = itemTotal - itemDiscount + itemTax;
    
                    // Accumulate totals
                    discountSum += itemDiscount;
                    taxSum += itemTax;
                    subtotalSum += itemSubtotal;
    
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.itemName}</td>
                            <td>8708</td>
                            <td>${item.quantity}</td>
                            <td>₹ ${item.unitPrice}</td>
                            <td>₹ ${((item.unitPrice ?? 0) * (item.quantity ?? 0) * (item.discountPer ?? 0) / 100).toFixed(2)} (${item.discountPer ?? 0}%)</td>
                            <td>₹ ${((item.unitPrice ?? 0) * (item.quantity ?? 0) * (item.tax ?? 0) / 100).toFixed(2)} (${item.tax ?? 0}%)</td>
                            <td>₹ ${(((item.unitPrice ?? 0) * (item.quantity ?? 0)) - 
                                    ((item.unitPrice ?? 0) * (item.quantity ?? 0) * (item.discountPer ?? 0) / 100) + 
                                    ((item.unitPrice ?? 0) * (item.quantity ?? 0) * (item.tax ?? 0) / 100)).toFixed(2)}</td>
                        </tr>`;
                }).join('')}
                <tr style="background-color: #0073AA; color:white;">
                    <td colspan="5"><strong>Total</strong></td>
        <p class="amount-in-words"><strong>Estimate Amount in Words:</strong> ${numberToWords(subtotalSum)}</p>
                    <td>₹ ${taxSum.toFixed(2)}</td>
                    <td>₹ ${subtotalSum.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="summary">
            <div class="summary-box">
                <div class="signature">
                    <div>
                        <p>From: ${selectedCompany.value.company_name}</p>
                        <img src="http://localhost:5000/uploads/${selectedCompany.value.image}" alt="${selectedCompany.value.company_name}" />
                        <p><b>Authorized Signatory</b></p>
                    </div>
                </div>
            </div>
            <div class="summary-box">
                <h4>Payment Details</h4>
                <p>Paid: <span class="amount">0</span></p>
                <p>Balance Due: <span class="amount">-35,510,828,736.964</span></p>
            </div>
        </div>
        
        <div class="note">
            <div class="footer">
                <p>Thank you for your business! For any inquiries, please contact us at <a href="mailto:${email}">${email}</a>.</p>
            </div>       
         </div>
    </div>
</body>
</html>`
;
};