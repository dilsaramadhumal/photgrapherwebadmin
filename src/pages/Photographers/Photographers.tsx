import AdminShowPhotographersSection from "@/section/AdminShowPhotographersSection/AdminShowPhotographersSection";
import PhotographerRegister from "@/section/PhotographerRegisterSection/PhotographerRegister";
import { useState } from "react";

const Photographers = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState("view"); // "view" or "add"

  return (
    //Parent container 2
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      borderRadius: '0.5rem'
    }}>
      {/* Animated Background Elements all over the page*/}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {/*Animations*/}
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: '2.5rem',
          width: '18rem',
          height: '18rem',
          background: '#bfdbfe',
          borderRadius: '9999px',
          mixBlendMode: 'multiply',
          filter: 'blur(64px)',
          opacity: 0.3,
          animation: 'blob 7s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '10rem',
          right: '2.5rem',
          width: '18rem',
          height: '18rem',
          background: '#e9d5ff',
          borderRadius: '9999px',
          mixBlendMode: 'multiply',
          filter: 'blur(64px)',
          opacity: 0.3,
          animation: 'blob 7s infinite 2s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '5rem',
          left: '50%',
          width: '18rem',
          height: '18rem',
          background: '#c7d2fe',
          borderRadius: '9999px',
          mixBlendMode: 'multiply',
          filter: 'blur(64px)',
          opacity: 0.3,
          animation: 'blob 7s infinite 4s'
        }}></div>
      </div>

      {/* Panel's Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '75rem',
        margin: '1rem auto 0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '5rem',
            height: '5rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            marginBottom: '1rem',
            transition: 'transform 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{ fontSize: '2.25rem' }}>📸</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 5vw, 3.75rem)',
            fontWeight: 'bold',
            //background: 'linear-gradient(to right, #FFC964, #FFD700)',
            WebkitBackgroundClip: 'text',
            //WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            animation: 'fade-in 0.8s ease-out'
          }}>
            Photographers
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '42rem',
            margin: '0 auto',
            lineHeight: '1.75'
          }}>
            Manage your photography team with ease. Add, edit, and showcase talented photographers.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => {
              setShowForm(true);
              setActiveSection("view");
            }}
            style={{
              position: 'relative',
              padding: '1rem 2rem',
              background: 'linear-gradient(to right, #FFC964, #FFD700)',
              color: 'white',
              borderRadius: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontWeight: '600',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'relative'
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Photographers
            </span>
          </button>

          <button
            onClick={() => {
              setShowForm(true);
              setActiveSection("add");
            }}
            style={{
              position: 'relative',
              padding: '1rem 2rem',
              background: 'linear-gradient(to right, #FFC964, #FFD700)',
              color: 'white',
              borderRadius: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontWeight: '600',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'relative'
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Photographer
            </span>
          </button>

          {showForm && (
            <button
              onClick={() => setShowForm(false)}
              style={{
                position: 'relative',
                padding: '1rem 2rem',
                background: 'linear-gradient(to right, #000000, #333333)',
                color: 'white',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontWeight: '600',
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.3s',
                animation: 'fade-in 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                position: 'relative'
              }}>
                <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close Panel
              </span>
            </button>
          )}
        </div>

        {/* Form Panel with Animation */}
        <div style={{
          transition: 'all 0.5s ease-in-out',
          opacity: showForm ? 1 : 0,
          transform: showForm ? 'translateY(0)' : 'translateY(-1rem)',
          maxHeight: showForm ? 'fit-content' : '0',
          overflow: showForm ? 'visible' : 'hidden'
        }}>
          {showForm && (
            <div style={{ //panel main container
              position: 'relative',
              background: 'var(--bg-primary)',
              //background: 'black',
              backdropFilter: 'blur(16px)',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '0',
              transition: 'box-shadow 0.3s',
              animation: 'fade-in 0.5s ease-out'
            }}>              
              <div style={{ position: 'relative' }}>
                {activeSection === "view" ? (
                  <AdminShowPhotographersSection />
                ) : (
                  <PhotographerRegister />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Photographers;