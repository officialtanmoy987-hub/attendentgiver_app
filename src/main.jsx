import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  CalendarClock,
  Check,
  ChevronLeft,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";
import "./styles.css";

const durations = ["12hr", "24hr", "48hr", "Custom"];
const conditionTags = [
  "Post-Surgery",
  "Dementia",
  "Stroke Recovery",
  "Dialysis Support",
  "Bedridden",
  "Pediatric Care",
];
const expectations = [
  "Medication reminders",
  "Meal prep",
  "Bathing/hygiene",
  "Mobility assist",
  "Emotional companionship",
  "Medical equipment handling",
];
const specialisations = ["ICU recovery", "Elderly care", "Post-op", "Pediatric", "Palliative"];

const requests = [
  {
    id: 1,
    family: "Rao Family",
    tags: ["Post-Surgery", "Mobility assist"],
    duration: "24hr",
    distance: "2.4 km",
    status: "Pending",
    brief: "Knee replacement recovery, vitals twice daily, gentle assisted walking.",
  },
  {
    id: 2,
    family: "Mehta Family",
    tags: ["Dementia", "Meal prep"],
    duration: "48hr",
    distance: "4.1 km",
    status: "Active",
    brief: "Calm supervision, medication reminders, evening companionship.",
  },
  {
    id: 3,
    family: "Sen Family",
    tags: ["Dialysis Support", "Bedridden"],
    duration: "12hr",
    distance: "1.8 km",
    status: "Completed",
    brief: "Transfer support, hygiene routine, equipment awareness preferred.",
  },
];

const fadeSlide = {
  initial: { opacity: 0, x: 30, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -30, filter: "blur(4px)" },
};

function App() {
  const [portal, setPortal] = useState("landing");

  return (
    <main className="app-shell">
      <DepthLayer />
      <nav className="top-nav glass-panel">
        <div className="brand-mark">
          <span className="brand-icon">
            <HeartPulse size={20} strokeWidth={2.5} />
          </span>
          <span>Swasthya AI</span>
        </div>
        <div className="nav-status">
          <span className="pulse-dot" />
          Care network online
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {portal === "landing" && <Landing key="landing" onPortal={setPortal} />}
        {portal === "family" && <FamilyFlow key="family" onBack={() => setPortal("landing")} />}
        {portal === "caregiver" && (
          <CaregiverFlow key="caregiver" onBack={() => setPortal("landing")} />
        )}
      </AnimatePresence>
    </main>
  );
}

function DepthLayer() {
  return (
    <div className="depth-field" aria-hidden="true">
      <span className="depth-grid" />
      <span className="depth-ring ring-one" />
      <span className="depth-ring ring-two" />
      <span className="depth-line line-one" />
      <span className="depth-line line-two" />
    </div>
  );
}

function Landing({ onPortal }) {
  return (
    <motion.section className="landing stage" {...fadeSlide} transition={{ duration: 0.45 }}>
      <div className="hero-copy">
        <div className="eyebrow">
          <Sparkles size={16} />
          Medical trust, futuristic calm
        </div>
        <h1>Book verified care with orbit-level clarity.</h1>
        <p>
          Families post care needs in guided steps. Professional attendants verify, declare
          availability, and accept live bookings from one calm control surface.
        </p>
      </div>

      <div className="portal-grid">
        <PortalCard
          icon={<UsersRound size={28} />}
          title="Family Portal"
          subtitle="I need care for my loved one"
          details="Create a request with patient context, duration, conditions, and care expectations."
          cta="Enter family flow"
          onClick={() => onPortal("family")}
        />
        <PortalCard
          icon={<Stethoscope size={28} />}
          title="Caregiver Portal"
          subtitle="I am a professional attendant"
          details="Verify identity, add experience, declare commitment, and accept live bookings."
          cta="Enter caregiver flow"
          onClick={() => onPortal("caregiver")}
        />
      </div>
    </motion.section>
  );
}

function PortalCard({ icon, title, subtitle, details, cta, onClick }) {
  return (
    <motion.article className="portal-card floating-card" whileHover={{ y: -8, scale: 1.015 }}>
      <div className="card-icon">{icon}</div>
      <div>
        <h2>{title}</h2>
        <p className="subtitle">{subtitle}</p>
      </div>
      <p>{details}</p>
      <button className="primary-button" onClick={onClick}>
        {cta}
      </button>
    </motion.article>
  );
}

function FamilyFlow({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    age: "",
    relationship: "",
    duration: "24hr",
    customDuration: "",
    conditions: ["Post-Surgery"],
    expectations: ["Medication reminders", "Mobility assist"],
  });

  const steps = [
    {
      label: "Patient",
      content: (
        <div className="field-grid">
          <TextField
            label="Patient name"
            value={form.name}
            onChange={(name) => setForm({ ...form, name })}
            placeholder="Asha Mehta"
          />
          <TextField
            label="Age"
            value={form.age}
            onChange={(age) => setForm({ ...form, age })}
            placeholder="72"
            type="number"
          />
          <TextField
            label="Relationship"
            value={form.relationship}
            onChange={(relationship) => setForm({ ...form, relationship })}
            placeholder="Mother"
          />
        </div>
      ),
    },
    {
      label: "Duration",
      content: (
        <>
          <Segmented options={durations} value={form.duration} onChange={(duration) => setForm({ ...form, duration })} />
          {form.duration === "Custom" && (
            <TextField
              label="Custom duration"
              value={form.customDuration}
              onChange={(customDuration) => setForm({ ...form, customDuration })}
              placeholder="36hr"
            />
          )}
        </>
      ),
    },
    {
      label: "Condition",
      content: (
        <ChipGroup
          items={conditionTags}
          selected={form.conditions}
          onToggle={(conditions) => setForm({ ...form, conditions })}
        />
      ),
    },
    {
      label: "Expectations",
      content: (
        <Checklist
          items={expectations}
          selected={form.expectations}
          onToggle={(expectations) => setForm({ ...form, expectations })}
        />
      ),
    },
    {
      label: "Confirm",
      content: <RequestPreview form={form} />,
    },
  ];

  return (
    <motion.section className="workflow stage" {...fadeSlide} transition={{ duration: 0.45 }}>
      <BackButton onBack={onBack} />
      <div className="workflow-layout">
        <aside className="flow-sidebar glass-panel">
          <span className="status-badge pending">Pending</span>
          <h1>Family booking flow</h1>
          <p>Step through a concise request builder and post a care card attendants can review.</p>
          <StepRail steps={steps} active={step} />
        </aside>
        <section className="flow-card floating-card">
          <AnimatePresence mode="wait">
            <motion.div key={step} {...fadeSlide} transition={{ duration: 0.28 }}>
              <div className="flow-card-header">
                <span>Step {step + 1} of {steps.length}</span>
                <h2>{steps[step].label}</h2>
              </div>
              {steps[step].content}
            </motion.div>
          </AnimatePresence>
          <div className="flow-actions">
            <button className="ghost-button" disabled={step === 0} onClick={() => setStep(step - 1)}>
              Previous
            </button>
            <button className="primary-button" onClick={() => (step === steps.length - 1 ? setStep(0) : setStep(step + 1))}>
              {step === steps.length - 1 ? "Post Request" : "Continue"}
            </button>
          </div>
        </section>
      </div>
    </motion.section>
  );
}

function CaregiverFlow({ onBack }) {
  const [screen, setScreen] = useState("verify");
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [experience, setExperience] = useState(6);
  const [selectedSpecialisations, setSelectedSpecialisations] = useState(["Elderly care", "Post-op"]);
  const [committed, setCommitted] = useState(false);
  const [accepted, setAccepted] = useState(null);

  return (
    <motion.section className="workflow stage" {...fadeSlide} transition={{ duration: 0.45 }}>
      <BackButton onBack={onBack} />
      <div className="workflow-layout caregiver-layout">
        <aside className="flow-sidebar glass-panel">
          <span className={`status-badge ${accepted ? "active" : "pending"}`}>
            {accepted ? "Active" : "Pending"}
          </span>
          <h1>Professional attendant portal</h1>
          <p>Verify, declare availability, and accept care requests with full-duration confidence.</p>
          <div className="tab-stack">
            {["verify", "experience", "dashboard"].map((item) => (
              <button
                key={item}
                className={screen === item ? "tab active-tab" : "tab"}
                onClick={() => setScreen(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="flow-card floating-card">
          <AnimatePresence mode="wait">
            {screen === "verify" && (
              <motion.div key="verify" {...fadeSlide} transition={{ duration: 0.28 }}>
                <div className="trust-row">
                  <div className="card-icon">
                    <ShieldCheck size={30} />
                  </div>
                  <span className="trust-badge">
                    <BadgeCheck size={16} /> Identity protected
                  </span>
                </div>
                <div className="flow-card-header">
                  <span>Aadhaar Verification</span>
                  <h2>Verify your professional identity</h2>
                </div>
                <TextField
                  label="Masked Aadhaar"
                  value={aadhaar}
                  maxLength={12}
                  onChange={(value) => setAadhaar(value.replace(/\D/g, ""))}
                  placeholder="XXXX XXXX 1234"
                />
                <TextField
                  label="OTP"
                  value={otp}
                  maxLength={6}
                  onChange={(value) => setOtp(value.replace(/\D/g, ""))}
                  placeholder="6-digit code"
                />
                <button className="primary-button wide" onClick={() => setScreen("experience")}>
                  <ShieldCheck size={18} /> Verify Identity
                </button>
              </motion.div>
            )}

            {screen === "experience" && (
              <motion.div key="experience" {...fadeSlide} transition={{ duration: 0.28 }}>
                <div className="flow-card-header">
                  <span>Experience Form</span>
                  <h2>Set your care profile</h2>
                </div>
                <label className="slider-field">
                  <span>{experience} years of experience</span>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={experience}
                    onChange={(event) => setExperience(event.target.value)}
                  />
                </label>
                <ChipGroup
                  items={specialisations}
                  selected={selectedSpecialisations}
                  onToggle={setSelectedSpecialisations}
                />
                <button className={`commit-toggle ${committed ? "committed" : ""}`} onClick={() => setCommitted(!committed)}>
                  <span className="check-orb">{committed && <Check size={18} />}</span>
                  <span>I commit to being available for the full booked duration</span>
                </button>
                <button className="primary-button wide" onClick={() => setScreen("dashboard")}>
                  Open Live Requests
                </button>
              </motion.div>
            )}

            {screen === "dashboard" && (
              <motion.div key="dashboard" {...fadeSlide} transition={{ duration: 0.28 }}>
                <div className="flow-card-header">
                  <span>Live Requests Dashboard</span>
                  <h2>Open bookings nearby</h2>
                </div>
                <div className="request-grid">
                  {requests.map((request) => (
                    <LiveRequestCard
                      key={request.id}
                      request={request}
                      accepted={accepted?.id === request.id}
                      onAccept={() => setAccepted(request)}
                    />
                  ))}
                </div>
                {accepted && <AcceptedPanel request={accepted} />}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </motion.section>
  );
}

function BackButton({ onBack }) {
  return (
    <button className="back-button" onClick={onBack}>
      <ChevronLeft size={18} /> Portals
    </button>
  );
}

function TextField({ label, value, onChange, type = "text", ...props }) {
  return (
    <label className="text-field">
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} {...props} />
    </label>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="segmented">
      {options.map((option) => (
        <button key={option} className={value === option ? "selected" : ""} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function ChipGroup({ items, selected, onToggle }) {
  const toggle = (item) => {
    onToggle(selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item]);
  };
  return (
    <div className="chip-group">
      {items.map((item) => (
        <button key={item} className={selected.includes(item) ? "chip selected-chip" : "chip"} onClick={() => toggle(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}

function Checklist({ items, selected, onToggle }) {
  const toggle = (item) => {
    onToggle(selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item]);
  };
  return (
    <div className="checklist">
      {items.map((item) => (
        <button key={item} className={selected.includes(item) ? "check-row checked" : "check-row"} onClick={() => toggle(item)}>
          <span>{selected.includes(item) && <Check size={16} />}</span>
          {item}
        </button>
      ))}
    </div>
  );
}

function StepRail({ steps, active }) {
  return (
    <div className="step-rail">
      {steps.map((step, index) => (
        <div key={step.label} className={index <= active ? "step-pill reached" : "step-pill"}>
          <span>{index + 1}</span>
          {step.label}
        </div>
      ))}
    </div>
  );
}

function RequestPreview({ form }) {
  const duration = form.duration === "Custom" ? form.customDuration || "Custom" : form.duration;
  return (
    <article className="request-preview glass-panel">
      <div className="preview-topline">
        <span className="status-badge pending">Pending</span>
        <CalendarClock size={20} />
      </div>
      <h3>{form.name || "Patient name"} care request</h3>
      <p>{form.age || "Age"} years old · {form.relationship || "Relationship"} · {duration}</p>
      <div className="mini-chip-row">
        {form.conditions.map((item) => <span key={item}>{item}</span>)}
      </div>
      <ul>
        {form.expectations.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function LiveRequestCard({ request, accepted, onAccept }) {
  return (
    <motion.article className={`live-card ${accepted ? "accepted-card" : ""}`} whileHover={{ y: -5 }}>
      <div className="live-card-head">
        <strong>{request.family}</strong>
        <span className={`status-badge ${request.status.toLowerCase()}`}>{request.status}</span>
      </div>
      <div className="mini-chip-row">
        {request.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="meta-line">
        <CalendarClock size={16} /> {request.duration}
        <MapPin size={16} /> {request.distance}
      </div>
      <div className="card-actions">
        <button className="accept-button" onClick={onAccept}>Accept</button>
        <button className="ghost-button compact">View Details</button>
      </div>
    </motion.article>
  );
}

function AcceptedPanel({ request }) {
  const countdown = useMemo(() => {
    const duration = request.duration.replace("hr", "");
    return `${duration}:00:00`;
  }, [request.duration]);

  return (
    <article className="accepted-panel glass-panel">
      <div>
        <span className="status-badge active">Active</span>
        <h3>{request.family} booking accepted</h3>
        <p>{request.brief}</p>
      </div>
      <div className="countdown">
        <Activity size={18} />
        {countdown}
      </div>
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);
