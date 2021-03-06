let accountDetails = {
    userone: 
    { acno: 1000, name: "sanjay", balance: 10000, username: "userone", password: "testuser", history:[] },
    usertwo: { acno: 1001, name: "anjay", balance: 20000, username: "usertwo", password: "testuser1",history:[]},
    userthree: { acno: 1002, name: "ajay", balance: 25000, username: "userthree", password: "testuser2", history:[]},
};

const authenticateUser = (uname,pwd) => {
    let dataset = accountDetails;
  
    if (uname in dataset) {
        if (dataset[uname].password == pwd) {
            return 1;//valid user password
        }
        else {
            return 0;//invalid password
        }
    }
    else {
        return -1;//no user exist
    }
  }

  function deposit(username, password, amount) {
    let user = authenticateUser(username, password);
    if (user == 1) {
        accountDetails[username].balance += amount;
        accountDetails[username].history.push({
            amount: amount,
            typeOfTransaction: "credit"
        });
        return "your account has been credited with" + amount+"new balance"+accountDetails[username].balance;
    } else {
        return "invalid details";
    }
}

    function withdrew(username, password, amount){
        let user = authenticateUser(username, password);
        if (user == 1) {
            console.log(accountDetails[username].balance)
                if(accountDetails[username].balance<amount){
                    return "Insuffitient balance";
                }
            accountDetails[username].balance -= amount;
            accountDetails[username].history.push({
                amount: amount,
                typeOfTransaction: "debit"
            });
            return "your account has been debited with" + amount+"new balance"+accountDetails[username].balance;
        } else {
            return "invalid details";
        }
    }
  
  module.exports={
      authenticateUser,
      deposit,
      withdrew
  }