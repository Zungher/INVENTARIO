document.addEventListener('DOMContentLoaded', function() {
    const eventList = document.querySelector('.event-list');
    const eventPopup = document.getElementById('event-popup');
    const eventForm = document.getElementById('event-form');
    const eventDateInput = document.getElementById('event-date');
    const eventTitleInput = document.getElementById('event-title');
    const eventDescriptionShortInput = document.getElementById('event-description-short');
    const eventDescriptionLongInput = document.getElementById('event-description-long');
    const saveEventButton = document.getElementById('save-event-button');
    const cancelButton = document.getElementById('cancel-button');
    let editingEvent = null;

    // Agregar evento
    
    cancelButton.addEventListener('click', function() {
        eventPopup.style.display = 'none';
    });
        saveEventButton.addEventListener('click', function() {
        const date = eventDateInput.value;
        const title = eventTitleInput.value;
        const descriptionShort = eventDescriptionShortInput.value;
        const descriptionLong = eventDescriptionLongInput.value;

        if (date && title && descriptionShort && descriptionLong) {
            if (editingEvent) {
                // Actualizar el evento existente
                editingEvent.querySelector('.event-date').textContent = date;
                editingEvent.querySelector('h2').textContent = title;
                editingEvent.querySelector('.event-description').textContent = descriptionShort;
                editingEvent.querySelector('.description p').textContent = descriptionLong;
            } else {
                // Crear un nuevo evento
                const event = createEvent(date, title, descriptionShort, descriptionLong);
                eventList.appendChild(event);
            }

            clearForm();
            eventPopup.style.display = 'none';
            
        }
    });

    // Mostrar el formulario de evento al hacer clic en "Agregar Evento"
    document.getElementById('add-event-button').addEventListener('click', function() {
        editingEvent = null;
        eventForm.dataset.mode = 'add';
        clearForm();
        eventPopup.style.display = 'block';
    });

    // Mostrar el formulario de evento al hacer clic en "Modificar Evento"
    document.getElementById('edit-event-button').addEventListener('click', function() {
        const selectedEvent = getSelectedEvent();
        if (selectedEvent) {
            editingEvent = selectedEvent;
            fillForm(selectedEvent);
            eventForm.dataset.mode = 'edit';
            eventPopup.style.display = 'block';
        } else {
            alert('Selecciona un evento para editar.');
        }
    });

    // Eliminar eventos seleccionados
    document.getElementById('delete-event-button').addEventListener('click', function() {
        const selectedEvents = getSelectedEvents();
        if (selectedEvents.length > 0) {
            selectedEvents.forEach((event) => {
                eventList.removeChild(event);
            });
        } else {
            alert('Selecciona al menos un evento para eliminar.');
        }
    });

    // Mostrar/ocultar descripción larga al hacer clic en un evento
    eventList.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('event')) {
            const description = event.target.querySelector('.description');
            if (description.style.display === 'block') {
                description.style.display = 'none';
            } else {
                description.style.display = 'block';
            }
        }
    });

    // Función para crear un nuevo evento
    function createEvent(date, title, descriptionShort, descriptionLong) {
        const event = document.createElement('div');
        event.classList.add('event');
        event.innerHTML = `
            <input type="checkbox" class="event-checkbox">
            <p class="event-date">${date}</p>
            <h2>${title}</h2>
            <p class="event-description">${descriptionShort}</p>
            <div class="description" style="display: none;">
                <p>${descriptionLong}</p>
            </div>
        `;
        return event;
    }

    // Función para limpiar el formulario
    function clearForm() {
        eventDateInput.value = '';
        eventTitleInput.value = '';
        eventDescriptionShortInput.value = '';
        eventDescriptionLongInput.value = '';
    }

    // Función para llenar el formulario con los datos de un evento seleccionado
    function fillForm(selectedEvent) {
        eventDateInput.value = selectedEvent.querySelector('.event-date').textContent;
        eventTitleInput.value = selectedEvent.querySelector('h2').textContent;
        eventDescriptionShortInput.value = selectedEvent.querySelector('.event-description').textContent;
        eventDescriptionLongInput.value = selectedEvent.querySelector('.description p').textContent;
    }

    // Función para obtener el evento seleccionado
    function getSelectedEvent() {
        const events = document.querySelectorAll('.event');
        for (const event of events) {
            if (event.querySelector('.event-checkbox').checked) {
                return event;
            }
        }
        return null;
    }

    // Función para obtener todos los eventos seleccionados
    function getSelectedEvents() {
        const selectedEvents = [];
        const events = document.querySelectorAll('.event');
        for (const event of events) {
            if (event.querySelector('.event-checkbox').checked) {
                selectedEvents.push(event);
            }
        }
        return selectedEvents;
    }
});

// Referencias a elementos del DOM
const addEventButton = document.getElementById('add-event-button');
const editEventButton = document.getElementById('edit-event-button');
const cancelPopupButton = document.getElementById('cancel-button');
const overlay = document.querySelector('.overlay');
const eventPopup = document.getElementById('event-popup');

// Función para mostrar el popup
function showPopup() {
    overlay.classList.add('active');
    eventPopup.classList.add('active');
}

// Función para ocultar el popup
function hidePopup() {
    overlay.classList.remove('active');
    eventPopup.classList.remove('active');
}

// Mostrar el popup al hacer clic en "Agregar Evento"
addEventButton.addEventListener('click', showPopup);

// Mostrar el popup al hacer clic en "Modificar Evento"
editEventButton.addEventListener('click', showPopup);

// Ocultar el popup al hacer clic en "Cancelar"
cancelPopupButton.addEventListener('click', hidePopup);


