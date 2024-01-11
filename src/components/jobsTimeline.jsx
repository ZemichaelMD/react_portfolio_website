import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";

import {
  faCalendarDays,
  faHouseLaptop,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const calculateDuration = (startDate, endDate = null) => {
  let start = new Date(startDate);
  let end = endDate ? new Date(endDate) : new Date();
  let diff = Math.abs(end - start);
  // return as xx years and xx month s
  let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  let months = Math.floor(days / 30);
  let years = Math.floor(months / 12);
  if (years > 0) {
    months = months % 12;
    return years + " years and " + months + " months";
  } else {
    return months + " months";
  }
};

const reorderByStartDate = (bio) => {
  return bio.sort((a, b) => {
    let aDate = new Date(a.startDate);
    let bDate = new Date(b.startDate);
    return bDate - aDate;
  });
};

const jobsTimelineItem = (job, index) => {
  return (
    <TimelineItem
      key={index}
      dateText={`${job.startDate} - ${job.endDate ? job.endDate : " Present"}`}
      style={{ color: "rgb(187 247 208)" }}
      dateInnerStyle={{ background: "#fff", color: "#333" }}
    >
      {job.role == 'Volunteer' || job.role == 'Member' ? <div className="mb-1 p-1 w-100 border rounded-t border-blue-400 bg-blue-100 ">Volunteer Work</div> : <div className="mb-1 p-1 w-100 border rounded-t border-green-400 bg-green-100 ">Job Experience</div>}

      <div className={`border ${job.role == 'Volunteer' || job.role == 'Member' ? 'border-blue-400' : 'border-green-400 '}  p-2`}>
        <h3 className="text-xl font-mono tracking-widest mb-4">
          {job.company}
        </h3>
        <h4 className="text-2lg font-mono tracking-widest mb-4">
          <strong>{job.role}</strong>· {job.country} ·
          {job.remote
            ? <FontAwesomeIcon icon={faHouseLaptop} />
            : ""}
          {job.remote
            ? " Remote "
            : ""}
        </h4>
        <h4 className="font-mono tracking-widest mb-4">
          <FontAwesomeIcon icon={faCalendarDays} /> {job.startDate} -{" "}
          {job.endDate ? job.endDate : " Present"} ·{" "}
          {calculateDuration(job.startDate, job.endDate)}
        </h4>
        <hr className="mb-4" />
        <h4 className="font-mono tracking-widest mb-4">
          <FontAwesomeIcon icon={faListCheck} /> Responsibilities:
        </h4>
        <hr className="mb-4" />
        {job.responsibilities.map((responsibility, index) => {
          return <p key={index}>· {responsibility}</p>;
        })}
        <hr className="mb-4" />
        <h4 className="font-mono tracking-widest mb-4">
          <FontAwesomeIcon icon={faCircleCheck} /> Skills:
        </h4>
        <hr className="mb-4" />
        <p>
          {job.skills.map((skill) => {
            return " · " + skill;
          })}
        </p>
        <hr className="mb-4" />
        { job.image ? <img src={job.image} alt={job.company} /> :"" }
      </div>
    </TimelineItem>
  );
};

const certificationTimelineItem = (certification, index) => {
  return (
    <TimelineItem
      key={index}
      dateText={`Issued on ${certification.startDate}`}
      style={{ color: "rgb(187 247 208)" }}
      dateInnerStyle={{ background: "#fff", color: "#333" }}
    >
      <div className="mb-1 p-1 w-100 border rounded-t border-purple-400 bg-purple-100 ">Certification</div>
      <div className="border border-purple-400 p-2">
        <h3 className="text-xl font-mono tracking-widest mb-4">
          From : {certification.organization}
        </h3>
        <h4 className="text-2lg font-mono tracking-widest mb-4">
          {certification.title}
        </h4>
        <h4 className="font-mono tracking-widest mb-4">
          <FontAwesomeIcon icon={faCalendarDays} /> {certification.startDate}
        </h4>
        <a className="p-1 w-100 border bg-green-400" href={certification.link} target="_blank">View Certificate</a>
        <hr className="mb-4" />
        {certification.skills && certification.skills.length > 0 && (
          <>
            <h4 className="font-mono tracking-widest mb-4">
              <FontAwesomeIcon icon={faCircleCheck} /> Skills:
            </h4>
            <hr className="mb-4" />
            <p>
              {certification.skills.map((skill) => {
                return " · " + skill;
              })}
            </p>
          </>
        )}
        <hr className="mb-4" />
        <img src={certification.image} alt={certification.title} />
      </div>
    </TimelineItem>
  );
};

const educationTimelineItem = (education, index) => {
  return (
    <TimelineItem
      key={index}
      dateText={`${education.startDate} - ${
        education.endDate ? education.endDate : " Present"
      }`}
      style={{ color: "rgb(187 247 208)" }}
      dateInnerStyle={{ background: "#fff", color: "#333" }}
    >
      <div className="mb-1 p-1 w-100 border rounded-t border-yellow-600 bg-yellow-100 ">Education</div>

      <div className="border border-yellow-600 p-2">
        <h3 className="text-xl font-mono tracking-widest mb-4">
          {education.university}
        </h3>
        <h4 className="text-2lg font-mono tracking-widest mb-4">
          {education.degree}
        </h4>
        <h4 className="font-mono tracking-widest mb-4">
          <FontAwesomeIcon icon={faCalendarDays} /> {education.startDate} -{" "}
          {education.endDate ? education.endDate : " Present"} ·{" "}
          {calculateDuration(education.startDate, education.endDate)}
        </h4>
        <hr className="mb-4" />
        {education.activitiesAndSocieties && (
          <>
            <h4 className="font-mono tracking-widest mb-4">
              <FontAwesomeIcon icon={faListCheck} /> Activities and Societies:
            </h4>
            <hr className="mb-4" />
            {education.activitiesAndSocieties.map((activity, index) => {
              return <p key={index}>· {activity}</p>;
            })}
          </>
        )}
        <hr className="mb-4" />
        <h4 className="font-mono tracking-widest mb-4">
          <FontAwesomeIcon icon={faCircleCheck} /> Description:
        </h4>
        <hr className="mb-4" />
        <p>{education.description}</p>
        <hr className="mb-4" />
        { education.image ? <img src={education.image} alt={education.university} /> :"" }
      </div>
    </TimelineItem>
  );
};

export default function JobsTimeline({ bio }) {
  bio = reorderByStartDate(bio);
  return (
    <>
      <Timeline lineColor={"#ddd"}>
        {bio.map((bio, index) => {
          if (bio.type === "job") {
            return jobsTimelineItem(bio, index);
          } else if (bio.type === "certification") {
            return certificationTimelineItem(bio, index);
          } else if (bio.type === "volunteer") {
            return jobsTimelineItem(bio, index);
          } else if (bio.type === "education") {
            return educationTimelineItem(bio, index);
          }
        })}
      </Timeline>
    </>
  );
}
