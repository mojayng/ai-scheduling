function addEvent(day) {
    const eventText = prompt(`Enter event for ${day}:`);
    if (eventText) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event-item');
        eventDiv.textContent = eventText;

        // Find the correct day column
        const dayColumns = document.querySelectorAll('.calendar .day-column');
        dayColumns[["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(day)].appendChild(eventDiv);
    }
}
