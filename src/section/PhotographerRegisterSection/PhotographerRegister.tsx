"use client";

import { useState } from "react";
import { photographerAPI } from "../../apis/api"; // adjust path to your helper

export default function AdminAddPhotographersPanel() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    whatsappNo: "",
    spotlightDescription: "",
    profileImageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.email.trim()) return "Email is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName || undefined,
        bio: form.bio || undefined,
        email: form.email,
        whatsappNo: form.whatsappNo || undefined,
        spotlightDescription: form.spotlightDescription || undefined,
        profileImage: form.profileImageUrl || undefined,
      };

      const res = await photographerAPI.create(payload);
      console.log('created photgrapher: ', res);

      setSuccessMsg("Photographer created successfully.");
      setForm({
        firstName: "",
        lastName: "",
        bio: "",
        email: "",
        whatsappNo: "",
        spotlightDescription: "",
        profileImageUrl: "",
      });
    } catch (err: any) {
      console.error("Create photographer error:", err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        "Failed to create";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '48rem',
      margin: '0 auto',
      padding: '2rem',
      background: 'var(--bg-primary)',
      borderRadius: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid var(--border-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '4rem',
          height: '4rem',
          background: 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          marginBottom: '1rem'
        }}>
          <svg
            style={{ width: '2rem', height: '2rem', color: '#000000' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          margin: 0
        }}>
          Add New Photographer
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginTop: '0.5rem'
        }}>
          Fill in the details to add a photographer to your team
        </p>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-green-800 font-medium">{successMsg}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-lg shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-800 font-medium">{errorMsg}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col group">
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              First Name <span className="text-red-500">*</span>
            </span>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm hover:border-gray-300"
              placeholder="John"
            />
          </label>

          <label className="flex flex-col group">
            <span className="text-sm font-semibold text-gray-700 mb-2">
              Last Name
            </span>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm hover:border-gray-300"
              placeholder="Doe"
            />
          </label>
        </div>

        {/* Email */}
        <label className="flex flex-col group">
          <span className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            Email <span className="text-red-500">*</span>
          </span>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm hover:border-gray-300"
              placeholder="john@example.com"
            />
          </div>
        </label>

        {/* WhatsApp */}
        <label className="flex flex-col group">
          <span className="text-sm font-semibold text-gray-700 mb-2">
            WhatsApp Number
          </span>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <input
              name="whatsappNo"
              value={form.whatsappNo}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm hover:border-gray-300"
              placeholder="+94 71 123 4567"
            />
          </div>
        </label>

        {/* Bio */}
        <label className="flex flex-col group">
          <span className="text-sm font-semibold text-gray-700 mb-2">
            Biography
          </span>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm hover:border-gray-300 resize-none"
            rows={4}
            placeholder="Tell us about this photographer's experience and expertise..."
          />
        </label>

        {/* Spotlight Description */}
        <label className="flex flex-col group">
          <span className="text-sm font-semibold text-gray-700 mb-2">
            Spotlight Description
          </span>
          <textarea
            name="spotlightDescription"
            value={form.spotlightDescription}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm hover:border-gray-300 resize-none"
            rows={3}
            placeholder="Highlight a special moment or achievement..."
          />
        </label>

        {/* Profile Image URL */}
        <label className="flex flex-col group">
          <span className="text-sm font-semibold text-gray-700 mb-2">
            Profile Image URL
          </span>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              name="profileImageUrl"
              value={form.profileImageUrl}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-sm hover:border-gray-300"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <small className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Paste an image URL here. For file uploads, contact your developer.
          </small>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              position: 'relative',
              padding: '1rem 1.5rem',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)',
              color: '#000000',
              fontWeight: '600',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.3s',
              overflow: 'hidden'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
            <span className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Photographer
                </>
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                firstName: "",
                lastName: "",
                bio: "",
                email: "",
                whatsappNo: "",
                spotlightDescription: "",
                profileImageUrl: "",
              })
            }
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '0.75rem',
              border: '2px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontWeight: '600',
              background: 'var(--bg-primary)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset
            </span>
          </button>
        </div>
      </form>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
