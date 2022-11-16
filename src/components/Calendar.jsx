const Calendar = () => {
  return (
    <div>
      <iframe
        src="https://embed.styledcalendar.com/#JZeCYjV6QXCDmqRQEnfM"
        title="calendar"
        frameBorder="0"
        className="h-96 w-11/12 m-auto border-2 "
        data-cy="calendar-embed-iframe"
      ></iframe>
      <script
        async
        type="module"
        src="https://embed.styledcalendar.com/assets/parent-window.js"
      ></script>
    </div>
  );
};
export default Calendar;
