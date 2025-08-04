import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  faCalendarDays,
  faHouseLaptop,
  faListCheck,
  faBriefcase,
  faGraduationCap,
  faCertificate,
  faHeart,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const calculateDuration = (startDate, endDate = null) => {
  let start = new Date(startDate);
  let end = endDate ? new Date(endDate) : new Date();
  let diff = Math.abs(end - start);
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

const TimelineCard = ({ children, type, dateText, icon, isActive = false }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case 'job':
        return {
          borderColor: 'border-green-500',
          iconBg: 'bg-green-500',
          iconColor: 'text-white',
          gradientFrom: 'from-green-500/10',
          gradientTo: 'to-green-600/5'
        };
      case 'education':
        return {
          borderColor: 'border-blue-500',
          iconBg: 'bg-blue-500',
          iconColor: 'text-white',
          gradientFrom: 'from-blue-500/10',
          gradientTo: 'to-blue-600/5'
        };
      case 'certification':
        return {
          borderColor: 'border-purple-500',
          iconBg: 'bg-purple-500',
          iconColor: 'text-white',
          gradientFrom: 'from-purple-500/10',
          gradientTo: 'to-purple-600/5'
        };
      case 'volunteer':
        return {
          borderColor: 'border-orange-500',
          iconBg: 'bg-orange-500',
          iconColor: 'text-white',
          gradientFrom: 'from-orange-500/10',
          gradientTo: 'to-orange-600/5'
        };
      default:
        return {
          borderColor: 'border-gray-500',
          iconBg: 'bg-gray-500',
          iconColor: 'text-white',
          gradientFrom: 'from-gray-500/10',
          gradientTo: 'to-gray-600/5'
        };
    }
  };

  const styles = getTypeStyles(type);

  return (
    <div className={`relative group ${isActive ? 'scale-105' : ''} transition-all duration-300 hover:scale-105`}>
      {/* Connection line for sequence */}
      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-gray-600 to-transparent opacity-30 group-last:hidden"></div>
      
      {/* Icon */}
      <div className={`absolute left-3 top-3 w-6 h-6 ${styles.iconBg} ${styles.iconColor} rounded-full flex items-center justify-center shadow-lg z-10`}>
        <FontAwesomeIcon icon={icon} className="text-xs" />
      </div>
      
      {/* Card */}
      <div className={`ml-12 max-w-2xl bg-gradient-to-br ${styles.gradientFrom} ${styles.gradientTo} bg-gray-800 border-l-4 ${styles.borderColor} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
        {/* Date header */}
        <div className="px-3 py-1.5 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center text-xs text-gray-400">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-1.5 text-xs" />
            {dateText}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

const getTypeIcon = (type, role) => {
  if (type === 'volunteer' || role === 'Volunteer' || role === 'Member') {
    return faHeart;
  } else if (type === 'certification') {
    return faCertificate;
  } else if (type === 'education') {
    return faGraduationCap;
  } else {
    return faBriefcase;
  }
};

const jobsTimelineItem = (job, index) => {
  const icon = getTypeIcon(job.type, job.role);
  
  return (
    <TimelineCard
      key={index}
      type={job.type === 'volunteer' || job.role === 'Volunteer' || job.role === 'Member' ? 'volunteer' : 'job'}
      dateText={`${job.startDate} - ${job.endDate ? job.endDate : "Present"}`}
      icon={icon}
    >
      <div className="flex items-start gap-3">
        {job.image && (
          <div className="flex-shrink-0">
            <img 
              src={job.image} 
              alt={job.company} 
              className="w-12 h-9 object-contain rounded border border-gray-600 bg-white/5" 
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-white mb-0.5">
                {job.company}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <span className="font-medium">{job.role}</span>
                <span className="text-gray-500">•</span>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-xs" />
                  {job.country}
                </div>
                {job.remote && (
                  <>
                    <span className="text-gray-500">•</span>
                    <span className="text-green-400 flex items-center">
                      <FontAwesomeIcon icon={faHouseLaptop} className="mr-1 text-xs" />
                      Remote
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <div className="text-right text-xs text-gray-400 ml-2">
              <div>{calculateDuration(job.startDate, job.endDate)}</div>
            </div>
          </div>

          <div className="mb-2">
            <h5 className="font-medium text-gray-200 mb-1 flex items-center text-xs">
              <FontAwesomeIcon icon={faListCheck} className="mr-1.5 text-xs" /> Responsibilities
            </h5>
            <ul className="space-y-0.5">
              {job.responsibilities.slice(0, 2).map((responsibility, idx) => (
                <li key={idx} className="text-gray-300 text-xs flex items-start">
                  <span className="text-green-400 mr-1.5 mt-0.5">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-gray-200 mb-1 flex items-center text-xs">
              <FontAwesomeIcon icon={faCircleCheck} className="mr-1.5 text-xs" /> Tech Stack
            </h5>
            <div className="flex flex-wrap gap-1">
              {job.skills.slice(0, 6).map((skill, idx) => (
                <span key={idx} className="bg-gray-700/50 text-gray-200 px-1.5 py-0.5 rounded text-xs border border-gray-600">
                  {skill}
                </span>
              ))}
              {job.skills.length > 6 && (
                <span className="text-gray-400 text-xs">+{job.skills.length - 6} more</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </TimelineCard>
  );
};

const certificationTimelineItem = (certification, index) => {
  const icon = getTypeIcon('certification');
  
  return (
    <TimelineCard
      key={index}
      type="certification"
      dateText={`Issued on ${certification.startDate}`}
      icon={icon}
    >
      <div className="flex items-start gap-3">
        {certification.image && (
          <div className="flex-shrink-0">
            <img 
              src={certification.image} 
              alt={certification.title} 
              className="w-12 h-9 object-contain rounded border border-gray-600 bg-white/5" 
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <h3 className="text-base font-bold text-white mb-0.5">
              {certification.title}
            </h3>
            <div className="text-xs text-gray-300 font-medium">
              {certification.organization}
            </div>
          </div>

          {certification.skills && certification.skills.length > 0 && (
            <div className="mb-2">
              <h5 className="font-medium text-gray-200 mb-1 flex items-center text-xs">
                <FontAwesomeIcon icon={faCircleCheck} className="mr-1.5 text-xs" /> Skills
              </h5>
              <div className="flex flex-wrap gap-1">
                {certification.skills.slice(0, 4).map((skill, idx) => (
                  <span key={idx} className="bg-purple-700/30 text-purple-200 px-1.5 py-0.5 rounded text-xs border border-purple-600/50">
                    {skill}
                  </span>
                ))}
                {certification.skills.length > 4 && (
                  <span className="text-gray-400 text-xs">+{certification.skills.length - 4} more</span>
                )}
              </div>
            </div>
          )}

          <a 
            className="inline-flex items-center px-2 py-1 rounded bg-purple-500 text-white text-xs font-medium hover:bg-purple-600 transition-colors" 
            href={certification.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Certificate
            <FontAwesomeIcon icon={faCircleCheck} className="ml-1 text-xs" />
          </a>
        </div>
      </div>
    </TimelineCard>
  );
};

const educationTimelineItem = (education, index) => {
  const icon = getTypeIcon('education');
  
  return (
    <TimelineCard
      key={index}
      type="education"
      dateText={`${education.startDate} - ${education.endDate ? education.endDate : "Present"}`}
      icon={icon}
    >
      <div className="flex items-start gap-3">
        {education.image && (
          <div className="flex-shrink-0">
            <img 
              src={education.image} 
              alt={education.school || education.university} 
              className="w-12 h-9 object-contain rounded border border-gray-600 bg-white/5" 
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-white mb-0.5">
                {education.school || education.university}
              </h3>
              <div className="text-xs text-gray-300 font-medium">
                {education.degree}
              </div>
            </div>
            
            <div className="text-right text-xs text-gray-400 ml-2">
              <div>{calculateDuration(education.startDate, education.endDate)}</div>
            </div>
          </div>

          {education.description && (
            <div className="mb-2">
              <p className="text-gray-300 text-xs">{education.description}</p>
            </div>
          )}
          
          {education.activitiesAndSocieties && (
            <div>
              <h5 className="font-medium text-gray-200 mb-1 flex items-center text-xs">
                <FontAwesomeIcon icon={faListCheck} className="mr-1.5 text-xs" /> Activities
              </h5>
              <ul className="space-y-0.5">
                {education.activitiesAndSocieties.slice(0, 2).map((activity, idx) => (
                  <li key={idx} className="text-gray-300 text-xs flex items-start">
                    <span className="text-blue-400 mr-1.5 mt-0.5">•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </TimelineCard>
  );
};

export default function JobsTimeline({ bio }) {
  const sortedBio = reorderByStartDate(bio);
  
  return (
    <div className="max-h-[28rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      <div className="space-y-4 py-2">
        {sortedBio.map((item, index) => {
          if (item.type === "job" || item.type === "volunteer") {
            return jobsTimelineItem(item, index);
          } else if (item.type === "certification") {
            return certificationTimelineItem(item, index);
          } else if (item.type === "education") {
            return educationTimelineItem(item, index);
          }
          return null;
        })}
      </div>
    </div>
  );
}