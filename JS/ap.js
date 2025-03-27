document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reservation-form");
    const reservationsList = document.getElementById("reservations-list");

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    // Mostrar las reservas guardadas en localStorage al cargar la página
    function renderReservations() {
        reservationsList.innerHTML = "";
        reservations.forEach((reservation, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reservation.name}</td>
                <td>${reservation.contact}</td>
                <td>${reservation.people}</td>
                <td>${reservation.date}</td>
                <td>${reservation.time}</td>
                <td><button class="delete-btn" data-index="${index}">❌ Cancelar</button></td>
            `;
            reservationsList.appendChild(row);
        });
    }

    renderReservations();

    // Verificar si el horario ya está ocupado
    function isAvailable(date, time) {
        return !reservations.some(res => res.date === date && res.time === time);
    }

    // Manejar el envío del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const people = document.getElementById("people").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (!isAvailable(date, time)) {
            alert("Ese horario ya está ocupado. Por favor elige otro.");
            return;
        }

        const reservation = { name, contact, people, date, time };
        reservations.push(reservation);
        localStorage.setItem("reservations", JSON.stringify(reservations));

        form.reset();
        renderReservations();
    });

    // Manejar la cancelación de una reserva
    reservationsList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            const confirmDelete = confirm("¿Seguro que quieres cancelar esta reservación?");
            if (confirmDelete) {
                reservations.splice(index, 1);
                localStorage.setItem("reservations", JSON.stringify(reservations));
                renderReservations();
            }
        }
    });
});