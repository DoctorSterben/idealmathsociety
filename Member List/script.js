// Store the member cards and form types
const allMemberCards = document.querySelectorAll('.member-card');

// Add event listeners for the buttons
document.getElementById('allButton').addEventListener('click', function() {
    // Show all members
    allMemberCards.forEach(card => {
        card.style.display = 'block';
    });
});

document.getElementById('newButton').addEventListener('click', function() {
    // Filter to show only "New Membership" type
    allMemberCards.forEach(card => {
        if (card.getAttribute('data-type') === 'new') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

document.getElementById('renewButton').addEventListener('click', function() {
    // Filter to show only "Renew" type
    allMemberCards.forEach(card => {
        if (card.getAttribute('data-type') === 'renew') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
