
$(() => {
    chrome.storage.sync.get(['total','goal'], (items) => {
        $('#total').text(items.total);
        $('#goal').text(items.goal);
    });


    $('#addAmount').click(function () {
        chrome.storage.sync.get(['total','goal'], (items) => {
            const newTotal = 0;
            if (items.total) {
                newTotal += parseInt(items.total);
            }

            const amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({ 'total' : newTotal });
            $('#total').text(newTotal);
            $('#amount').val('');

            if (newTotal >= items.goal) {
                const opt = {
                    type: "basic",
                    title: "Goal reached!",
                    message: "You reached your goal of " + items.goal + "!",
                    iconUrl: "img/icon2.png"
                }

                chrome.notifications.create('goalReached', opt, () => { });
            }
        });
    });
});
