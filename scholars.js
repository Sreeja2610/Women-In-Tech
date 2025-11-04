document.addEventListener('DOMContentLoaded', () => {
    fetch('output.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('scholarships-container');
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'scholarship-card';

                const logo = document.createElement('img');
                logo.src = item["item-logo src"];
                card.appendChild(logo);

                const title = document.createElement('h2');
                title.innerHTML = `<a href="${item["item-logo href"]}" target="_blank">${item["item-h2"]}</a>`;
                card.appendChild(title);

                const desc = document.createElement('p');
                desc.textContent = item["item-desc"];
                card.appendChild(desc);

                const deadline = document.createElement('p');
                deadline.className = 'deadline';
                deadline.textContent = item["sko-deadline-post"];
                card.appendChild(deadline);

                const posted = document.createElement('p');
                posted.className = 'posted';
                posted.textContent = item["sko-deadline-post 2"];
                card.appendChild(posted);

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching JSON data:', error));
});
