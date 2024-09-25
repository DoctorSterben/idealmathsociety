function searchMember() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const members = document.querySelectorAll('.member-card');

    members.forEach(member => {
        const name = member.getAttribute('data-name').toLowerCase();
        const sl = member.getAttribute('data-sl').toLowerCase();
        const phone = member.getAttribute('data-phone').toLowerCase();

        if (name.includes(searchTerm) || sl.includes(searchTerm) || phone.includes(searchTerm)) {
            member.style.display = '';
        } else {
            member.style.display = 'none';
        }
    });
}
