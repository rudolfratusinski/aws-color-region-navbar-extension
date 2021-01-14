function updateColor() {
    return function (event) {

        const color = event.target.value;

        chrome.tabs.executeScript({
            code: 'document.querySelector(\'[data-testid="aws-my-account-details"]\')?.innerText || document.querySelector(\'input[name="account"]\').value'
          }, function(results) {
            account_number = results[0];
            chrome.storage.local.set({
                [account_number]: color
            })
          });

        chrome.tabs.executeScript({
            file: 'main.js'
         }); 
    }
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', updateColor());

    if(window.browser !== undefined){
        // On Firefox
        // Workaround for a bug in their color picker
        input.type="text";
    }

    chrome.tabs.executeScript({
        code: 'document.querySelector(\'[data-testid="aws-my-account-details"]\')?.innerText || document.querySelector(\'input[name="account"]\').value'
      }, function(results) {
        account_number = results[0];

        chrome.storage.local.get(account_number, (result) => {
            let color = result[account_number];
            if (color !== undefined) {
                input.value = color;
            }
        });
    });
})





