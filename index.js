// MetaMask injects the web3 library for us.
window.addEventListener('load', function() {
    var web3 = window.web3;
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
        console.log("Connected to Metamask");
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            console.log(window.web3);
    }

    web3.version.getNetwork((err, netId) => {
        console.log(netId);
        switch (netId) {
            case "1":
                console.log('This is mainnet')
                break
            case "3":
                console.log('This is the ropsten test network.')
                break
            default:
                console.log('This is an unknown network.')
        }
    })

    var ABI = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
    var ContractAddress = '0x511344aFc5b297B580FA23d276870d248251d113';
   
    var SmartContract =  web3.eth.contract(ABI).at(ContractAddress);

    console.log(SmartContract);

    $("#setButton").click(function(){
        console.log("clicked set");
        SmartContract.set($("#numberToSet").val(), function (error, result) {
		    if (!error) {
		      console.log(result);
		    } else {
		      console.error(error);
		    }
		  });
    });
    
    SmartContract.get(function(error,result){
        if(!error){
            document.getElementById("get").innerHTML =result;
        }else{
            console.log(error);
        }
    })
    
});
