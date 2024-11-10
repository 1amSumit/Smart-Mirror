export default function Events() {
  const events = [
    { time: "8:30", title: "Team education" },
    { time: "10:30", title: "Awesome new project brainstorming" },
    { time: "13:00", title: "Lunch" },
  ];

  return (
    <div className="px-8 py-2 rounded-lg text-white min-w-[300px] font-quick">
      <h2 className="text-white text-sm font-medium mb-6">UPCOMING EVENTS</h2>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4">
            <span className="text-sm font-light">{event.time}</span>
            <span className="text-sm  font-semibold">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
