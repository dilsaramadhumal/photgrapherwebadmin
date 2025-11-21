import React, { useState } from "react";
import { Search, Users, ArrowUpDown } from "lucide-react";
import { usePhotographers } from "@/hooks/usePhotographers";
import { Photographer, PhotographerFormData } from "@/types/photographer";
import { Modal, ConfirmationDialog } from "@/components/Modal";
import { PhotographerCard, PhotographerDetailsView, PhotographerForm } from "@/components/PhotographerComponents";



const AdminShowPhotographersSection: React.FC = () => {
  const { data, loading, error, updatePhotographer, deletePhotographer } = usePhotographers();
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'name-ascending' | 'name-descending'>('name-ascending');
  const [selected, setSelected] = useState<Photographer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePhotographerConfirm, setShowDeletePhotographerConfirm] = useState(false);
  const [photographerToDelete, setPhotographerToDelete] = useState<number | null>(null);



  React.useEffect(() => {
    const onResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;



  const openDetails = (p: Photographer) => {
    setSelected(p);
    setIsEditing(false);
  };

  const handleSavePhotographer = async (formData: PhotographerFormData) => {
    if (!selected) return;
    
    const updates = {
      photographer_first_name: formData.firstName,
      photographer_last_name: formData.lastName,
      photographer_whatsapp_no: formData.phone,
      photographer_email: formData.email,
      profile_image: formData.image,
    };
    
    const success = await updatePhotographer(selected.id, updates);
    if (success) {
      setSelected({ ...selected, ...updates });
      setIsEditing(false);
    }
  };

  const handleDeletePhotographer = (id: number) => {
    setPhotographerToDelete(id);
    setShowDeletePhotographerConfirm(true);
  };

  const confirmDeletePhotographer = async () => {
    if (!photographerToDelete) return;
    
    const success = await deletePhotographer(photographerToDelete);
    if (success) {
      if (selected?.id === photographerToDelete) setSelected(null);
      setShowDeletePhotographerConfirm(false);
      setPhotographerToDelete(null);
    }
  };

  const filteredAndSortedData = data
    .filter((p) => {
      const fullName = `${p.photographer_first_name ?? ""} ${p.photographer_last_name ?? ""}`.toLowerCase();
      const email = (p.photographer_email ?? "").toLowerCase();
      const query = searchQuery.toLowerCase();
      return fullName.includes(query) || email.includes(query);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-ascending':
          const nameA = `${a.photographer_first_name ?? ""} ${a.photographer_last_name ?? ""}`;
          const nameB = `${b.photographer_first_name ?? ""} ${b.photographer_last_name ?? ""}`;
          return nameA.localeCompare(nameB);
        case 'name-descending':
          const nameA2 = `${a.photographer_first_name ?? ""} ${a.photographer_last_name ?? ""}`;
          const nameB2 = `${b.photographer_first_name ?? ""} ${b.photographer_last_name ?? ""}`;
          return nameB2.localeCompare(nameA2);
        default:
          return 0;
      }
    });

  return (
    <div style={styles.container}>
      {/* Header section hidden */}

      <div style={{
        ...styles.panel,
        padding: isMobile ? '16px' : '24px',
      }}>
        <div style={styles.left}>
          <div style={styles.filters}>
            <div style={styles.searchContainer}>
              <Search size={20} color="#9ca3af" style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div 
              style={styles.sortContainer}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ArrowUpDown size={16} color="#6b7280" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={styles.sortSelect}
              >
                <optgroup label="Name">
                  <option value="name-ascending">Ascending</option>
                  <option value="name-descending">Descending</option>
                </optgroup>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={styles.empty}>
              <div style={styles.spinner}></div>
              <p>Loading photographers...</p>
            </div>
          ) : error ? (
            <div style={styles.empty}>
              <p style={{ color: "#ef4444" }}>Error: {error}</p>
            </div>
          ) : filteredAndSortedData.length === 0 ? (
            <div style={styles.empty}>
              <Users size={48} color="#d1d5db" />
              <p>No photographers found</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {filteredAndSortedData.map((p) => (
                <PhotographerCard
                  key={p.id}
                  photographer={p}
                  isSelected={selected?.id === p.id}
                  onClick={() => openDetails(p)}
                />
              ))}
            </div>
          )}
        </div>

        <Modal
          isOpen={!!selected}
          onClose={() => { setSelected(null); setIsEditing(false); }}
          title={isEditing ? 'Edit Photographer' : 'Photographer Details'}
          width={isMobile ? '90%' : isTablet ? '500px' : '600px'}
        >
          {selected && (
            !isEditing ? (
              <PhotographerDetailsView
                photographer={selected}
                onEdit={() => setIsEditing(true)}
                onDelete={() => handleDeletePhotographer(selected.id)}
              />
            ) : (
              <PhotographerForm
                initialData={{
                  firstName: selected.photographer_first_name ?? "",
                  lastName: selected.photographer_last_name ?? "",
                  phone: selected.photographer_whatsapp_no ?? "",
                  email: selected.photographer_email ?? "",
                  image: selected.profile_image ?? null,
                }}
                onSave={handleSavePhotographer}
                onCancel={() => setIsEditing(false)}
                isMobile={isMobile}
              />
            )
          )}
        </Modal>
        <ConfirmationDialog
          isOpen={showDeletePhotographerConfirm}
          title="Delete Photographer"
          message="Are you sure you want to delete this photographer? This will permanently remove all their information and cannot be undone."
          confirmText="Delete Photographer"
          onConfirm={confirmDeletePhotographer}
          onCancel={() => {
            setShowDeletePhotographerConfirm(false);
            setPhotographerToDelete(null);
          }}
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    padding: '0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    borderRadius: '12px'
  },
  header: {
    maxWidth: '1400px',
    margin: '0 auto 24px',
  },
  headerContent: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap',
    gap: '20px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  headerTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
  },
  headerSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  statsCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    padding: '16px 24px',
    textAlign: 'center',
    minWidth: '140px',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: '12px',
    color: '#e0e7ff',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  panel: {
    maxWidth: '1400px',
    margin: '0 auto',
    background: 'var(--bg-primary)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  left: {
    width: '100%',
  },
  filters: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '300px',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'var(--bg-secondary)',
    border: 'none',
    borderRadius: '12px',
    minWidth: '180px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  },
  sortSelect: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontSize: '14px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: '500',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: '32px',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 44px',
    border: '2px solid var(--border-color)',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },


  empty: {
    padding: '60px 20px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

};

export default AdminShowPhotographersSection;

// Add global CSS for dropdown menu dark mode support
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    select optgroup {
      background: var(--bg-primary) !important;
      color: var(--text-secondary) !important;
    }
    
    select option {
      background: var(--bg-secondary) !important;
      color: var(--text-primary) !important;
    }
    
    select option:hover {
      background: var(--bg-primary) !important;
      color: var(--text-primary) !important;
    }
  `;
  if (!document.head.querySelector('[data-dropdown-styles]')) {
    style.setAttribute('data-dropdown-styles', 'true');
    document.head.appendChild(style);
  }
}