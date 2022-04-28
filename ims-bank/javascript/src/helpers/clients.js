export const organizeClientsAccounts = (transactions) => {
  const clients = [];

  transactions.forEach(element => {
    const clientIndex = clients.findIndex(item => item.id == element.customer_id);
    if ( clientIndex != -1){
      if(element.account_type === "savings") {
        clients[clientIndex].savings += getTransactionNumber(element.transaction_amount);
      }else  {
        clients[clientIndex].checking += getTransactionNumber(element.transaction_amount);
      }   
    } else {
      const client = {
        id: element.customer_id,
        name: element.customer_name,
        email: element.customer_email,
        savings: element.account_type === "savings" ? getTransactionNumber(element.transaction_amount) : 0,
        checking: element.account_type === "checking" ? getTransactionNumber(element.transaction_amount) : 0,
      }
      clients.push(client);
    }
  });
  return clients;
}

export const getTransactionNumber = (string) => {
  return Number(string.replace('$', ''));
}