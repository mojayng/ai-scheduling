// Function to render events on the calendar
function renderEvents(events) {
    events.forEach(event => {
        const dayIndex = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(event.day);
        const startHour = parseInt(event.start_time);
        const endHour = parseInt(event.end_time);
        const cell = document.getElementById(`cell-${startHour}-${dayIndex + 1}`);

        // Create the event div
        const eventDiv = document.createElement("div");
        eventDiv.className = "event";
        eventDiv.textContent = event.title;
        eventDiv.style.height = `${(endHour - startHour) * 60 - 10}px`; // Adjust event height
        eventDiv.style.top = "5%";

        // Create a delete button for the event
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.style.float = "right";
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.cursor = "pointer";

        deleteButton.addEventListener("click", () => {
            deleteEvent(event.day, event.title); // Call function to delete the event
            eventDiv.remove(); // Remove event from UI
        });

        // Append delete button to the event div and event div to the calendar cell
        eventDiv.appendChild(deleteButton);
        cell.appendChild(eventDiv);
    });
}

// Function to add an event to the calendar and send it to the backend
function addEvent() {
    const title = document.getElementById("event-title").value;
    const day = document.getElementById("event-day").value;
    const startTime = document.getElementById("event-time").value;
    const endTime = document.getElementById("event-end-time").value;

    if (title && day && startTime && endTime) {
        const startHour = parseInt(startTime);
        const endHour = parseInt(endTime);

        if (endHour <= startHour) {
            alert("End time must be after start time.");
            return;
        }

        // Add event to the backend
        fetch("/add_event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                day: day,
                event: { title: title, start_time: startTime, end_time: endTime },
            }),
        })
        .then(response => response.json())
        .then(data => {
            renderEvents([data.event]); // Render the added event on the calendar
            alert("Event added successfully!");
        })
        .catch(error => console.error("Error adding event:", error));
    }
}

// Function to delete an event from the backend
function deleteEvent(day, title) {
    fetch("/delete_event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: day, title: title }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Event deleted:", data);
    })
    .catch(error => console.error("Error deleting event:", error));
}
