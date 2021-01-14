
// Account with no role switching and with role switching fallback.
var account_number = document.querySelector('[data-testid="aws-my-account-details"]')?.innerText || document.querySelector('input[name="account"]').value;

chrome.storage.local.get(account_number, (result) => {
    let color = result[account_number];
    if(color === undefined){
        return;
    }
    document.querySelector("#awsc-navigation-container>div").style.backgroundColor=color;
})
