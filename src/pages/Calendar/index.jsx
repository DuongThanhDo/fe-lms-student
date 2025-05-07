import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Card, Button, Modal, Form, Input, DatePicker } from "antd";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { vi } from "date-fns/locale";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  vi: vi,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: vi }), 
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});

  const [currentView, setCurrentView] = useState(localStorage.getItem('currentView') || 'month'); 
  const [currentDate, setCurrentDate] = useState(localStorage.getItem('currentDate') ? new Date(localStorage.getItem('currentDate')) : new Date());

  useEffect(() => {
    localStorage.setItem('currentView', currentView);
    localStorage.setItem('currentDate', currentDate);
  }, [currentView, currentDate]);

  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
    setTitle("");
    setDesc("");
    setStart(null);
    setEnd(null);
  };

  const handleSlotSelected = (slotInfo) => {
    setTitle("");
    setDesc("");
    setStart(new Date(slotInfo.start));
    setEnd(new Date(slotInfo.end));
    setOpenSlot(true);
  };

  const handleEventSelected = (event) => {
    setOpenEvent(true);
    setClickedEvent(event);
    setStart(new Date(event.start));
    setEnd(new Date(event.end));
    setTitle(event.title);
    setDesc(event.desc);
  };

  const handleStartTime = (time) => {
    setStart(time?.toDate());
  };

  const handleEndTime = (time) => {
    setEnd(time?.toDate());
  };

  const setNewAppointment = () => {
    if (!title || !start || !end || isNaN(new Date(start)) || isNaN(new Date(end))) {
      console.error("Invalid data");
      return;
    }
    const appointment = { title, desc, start: new Date(start), end: new Date(end) };
    setEvents([...events, appointment]);
    handleClose();
  };

  const updateEvent = () => {
    const updatedEvent = [...events];
    const index = events.findIndex((event) => event === clickedEvent);
    if (index !== -1) {
      updatedEvent[index] = {
        title,
        desc,
        start: new Date(start),
        end: new Date(end),
      };
      setEvents(updatedEvent);
    }
    handleClose();
  };

  const deleteEvent = () => {
    const updatedEvents = events.filter((event) => event !== clickedEvent);
    setEvents(updatedEvents);
    handleClose();
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const eventActions = [
    <Button key="cancel" onClick={handleClose}>
      Cancel
    </Button>,
    <Button key="delete" danger onClick={deleteEvent}>
      Delete
    </Button>,
    <Button key="confirm" type="primary" onClick={updateEvent}>
      Confirm Edit
    </Button>,
  ];

  const appointmentActions = [
    <Button key="cancel" onClick={handleClose}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={setNewAppointment}>
      Submit
    </Button>,
  ];

  return (
      <div>
        <h3 style={{ marginTop: 12 }}>Lịch học</h3>
        <Calendar
          title={'Lịch học'}
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          view={currentView}
          date={currentDate}
          views={["month", "week", "day"]}
          onSelectSlot={handleSlotSelected}
          onSelectEvent={handleEventSelected}
          onView={handleViewChange} 
          onNavigate={handleNavigate} 
        />
  
        <Modal
          title={openEvent ? "Chỉnh sửa sự kiện" : "Tạo sự kiện mới"}
          open={openSlot || openEvent}
          onCancel={handleClose}
          footer={openEvent ? eventActions : appointmentActions}
        >
          <Form layout="vertical">
            <Form.Item label="Tên sự kiện">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
            </Form.Item>
            <Form.Item label="Bắt đầu">
              <DatePicker
                showTime
                style={{ width: "100%" }}
                value={start ? dayjs(start) : null}
                onChange={handleStartTime}
              />
            </Form.Item>
            <Form.Item label="Kết thúc">
              <DatePicker
                showTime
                style={{ width: "100%" }}
                value={end ? dayjs(end) : null}
                onChange={handleEndTime}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
     
  );
};

export default CalendarPage;
