import { ReviewsSection } from '@/features/reviews/ReviewsSection';

const Reviews = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      borderRadius: '0.5rem'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
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

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '75rem',
        margin: '0 auto',
        padding: '2rem'
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
            <span style={{ fontSize: '2.25rem' }}>⭐</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 5vw, 3.75rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            animation: 'fade-in 0.8s ease-out'
          }}>
            Reviews
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '42rem',
            margin: '0 auto',
            lineHeight: '1.75'
          }}>
            Manage customer reviews and feedback. Approve, reject, or moderate reviews to maintain quality.
          </p>
        </div>

        {/* Reviews Section */}
        <div style={{
          background: 'var(--bg-primary)',
          backdropFilter: 'blur(16px)',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '0',
          transition: 'box-shadow 0.3s',
          animation: 'fade-in 0.5s ease-out'
        }}>
          <ReviewsSection />
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

export default Reviews;