document.addEventListener('DOMContentLoaded', function() {
    const eventList = document.querySelector('.event-list');
    
    // Recupera los datos de eventos almacenados en sessionStorage
    const eventsData = JSON.parse(sessionStorage.getItem('eventsData'));
    
    // Comprueba si hay datos y muestra los eventos en la página
    if (eventsData && eventsData.length > 0) {
        eventsData.forEach(function(eventData) {
            const event = createEvent(eventData.date, eventData.title, eventData.descriptionShort, eventData.descriptionLong);
            eventList.appendChild(event);
        });
    }
    
    // Restablece los datos almacenados en sessionStorage para evitar futuras ediciones
    sessionStorage.removeItem('eventsData');
    
    // Función para crear un nuevo evento (la misma que en ventas.js)
    function createEvent(date, title, descriptionShort, descriptionLong) {
        // ...
    }
});
