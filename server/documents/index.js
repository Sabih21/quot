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
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotation Software</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        .header-table td { border: none; }
        .align-right { text-align: right; }
        .no-border { border: none; }
    </style>
</head>
<body>
    <h2 style="text-align: center;">Quotation</h2>
    
    <table class="header-table">
        <tr>
            <td>
                <strong>${client.name}</strong><br>
                ${address == undefined ? "No Address" : address}
                Phone: ${phone == undefined ? "No Address" : phone}<br>
                Email: ${email == undefined ? "No Address" : email}<br>
            </td>
            <td class="align-right">
                <strong>No:</strong> ${invoiceNumber}<br>
                <strong>Date:${moment(date).format('LL')}</strong> 
            </td>
        </tr>
    </table>

    <p><strong>Estimate For:</strong> ${name}</p>
    
    <table>
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
        ${items.map(item =>  { 
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
                    <td>1</td>
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
        })}
        <tr>
            <td colspan="5"><strong>Total</strong></td>
            <td>₹ ${discountSum}</td>
            <td>₹ ${taxSum}</td>
            <td>₹ ${subtotalSum}</td>
        </tr>
    </table>
    
    <p><strong>Estimate Amount in Words:</strong> ${numberToWords(subtotalSum)}</p>
    
    <table class="no-border">
        <tr>
            <td><strong>Notes:</strong><br> ${notes ? notes : 'None.'} </td>
            <td class="align-right" style="
    display: flex;
    justify-content: flex-end;
">
                <div style="display:flex;flex-direction: column;width: 20%;align-items: center;">
                    <p>From: ${selectedCompany.value.company_name}</p>
                    <img   
                        src=${`http://localhost:5000/uploads/${selectedCompany.value.image}`} 
                        alt={company.company_name} 
                        width="100" 
                    />
                    <p><b>Authorized Signatory</b></p>
                </div>
                    

            </td>
        </tr>
    </table>
</body>
</html>`;
};
