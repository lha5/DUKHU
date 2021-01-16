import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

const Container = styled.div`
  width: 1400px;
  margin: 0 auto;

  div.my-calendar {
    width: 80%;
    margin: 35px auto;
    font-family: 'NotoSans';
  }

  @media ${props => props.theme.device.desktop} {
    width: 70%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 70%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 80%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 85%;
  }
`;

function LandingPage() {
  const user = useSelector(state => state.user);

  return (
    <Container>
      <div className="my-calendar">
        <FullCalendar
          plugins={[ dayGridPlugin, momentTimezonePlugin, interactionPlugin ]}
          timeZone="local"
          locale="ko"
          initialView="dayGridMonth"
          timeFormat="HH:mm"
          defaultTimedEventDuration="01:00:00"
          editable={true}
          selectable={true}
          dayPopoverFormat="MM/DD dddd"
          dayCellContent={date => String(date.dayNumberText).split('일')[0]}
        />
      </div>
    </Container>
  );
};

export default LandingPage;
