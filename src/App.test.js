const editEvent = async (eventId, summary, description, date, start, end) => {
  const formattedStart = dayjs(date)
    .hour(dayjs(start).hour())
    .minute(dayjs(start).minute())
    .toISOString();
  const formattedEnd = dayjs(date)
    .hour(dayjs(end).hour())
    .minute(dayjs(end).minute())
    .toISOString();

  const updatedEvent = {
    summary: summary,
    description: description,
    start: {
      dateTime: formattedStart,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: formattedEnd,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };
  try {
    const response = await axios.put(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      updatedEvent,
      {
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
      }
    );
    console.log("Event updated", response.data);
    fetchGoogleEvents(); // Refresh the list after editing
  } catch (error) {
    console.error("Error updating event:", error);
  }
};