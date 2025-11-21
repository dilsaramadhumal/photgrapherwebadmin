import { useState } from 'react';
import Chip from '@/components/CustomChip/CustomChip';
import { 
  FaReact, 
  FaJs, 
  FaCss3, 
  FaCheck, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaTag
} from 'react-icons/fa';
import { 
  FiStar,
  FiHeart,
} from 'react-icons/fi';
import { 
  GiSpotedFlower 
} from 'react-icons/gi';

const ChipTestPage = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Next.js']);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Chip Component Showcase</h1>
      
      {/* Basic Chips */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Basic Chips</h2>
        <div className="flex flex-wrap gap-3">
          <Chip label="Default" />
          <Chip label="Primary" color="primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
          <Chip label="Error" color="error" />
          <Chip label="Warning" color="warning" />
          <Chip label="Info" color="info" />
          <Chip label="Gray" color="gray" />
        </div>
      </section>

      {/* Outlined Chips */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Outlined Chips</h2>
        <div className="flex flex-wrap gap-3">
          <Chip label="Default" variant="outlined" />
          <Chip label="Primary" variant="outlined" color="primary" />
          <Chip label="Secondary" variant="outlined" color="secondary" />
          <Chip label="Success" variant="outlined" color="success" />
          <Chip label="Error" variant="outlined" color="error" />
          <Chip label="Warning" variant="outlined" color="warning" />
          <Chip label="Info" variant="outlined" color="info" />
          <Chip label="Gray" variant="outlined" color="gray" />
        </div>
      </section>

      {/* Chips with Icons */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Chips with Icons</h2>
        <div className="flex flex-wrap gap-3">
          <Chip 
            label="React" 
            color="primary" 
            icon={<FaReact />} 
          />
          <Chip 
            label="JavaScript" 
            color="warning" 
            icon={<FaJs />} 
          />
          <Chip 
            label="CSS" 
            color="info" 
            icon={<FaCss3 />} 
          />
          <Chip 
            label="Verified" 
            color="success" 
            icon={<FaCheck />} 
          />
          <Chip 
            label="Warning" 
            color="warning" 
            variant="outlined"
            icon={<FaExclamationTriangle />} 
          />
          <Chip 
            label="Info" 
            color="info" 
            variant="outlined"
            icon={<FaInfoCircle />} 
          />
          <Chip 
            label="Flower" 
            color="secondary" 
            icon={<GiSpotedFlower />} 
          />
        </div>
      </section>

      {/* Clickable Chips */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Clickable Chips</h2>
        <div className="flex flex-wrap gap-3">
          <Chip 
            label={selectedChip === 'like' ? 'Liked!' : 'Like'} 
            color={selectedChip === 'like' ? 'success' : 'primary'} 
            onClick={() => setSelectedChip('like')}
            icon={<FiHeart />}
          />
          <Chip 
            label={selectedChip === 'star' ? 'Starred!' : 'Star'} 
            color={selectedChip === 'star' ? 'warning' : 'secondary'} 
            onClick={() => setSelectedChip('star')}
            icon={<FiStar />}
          />
          <Chip 
            label="Toggle Me" 
            color={selectedChip === 'toggle' ? 'error' : 'gray'} 
            onClick={() => setSelectedChip(selectedChip === 'toggle' ? null : 'toggle')}
            variant={selectedChip === 'toggle' ? 'filled' : 'outlined'}
          />
        </div>
      </section>

      {/* Removable Chips */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Removable Chips</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              color="primary"
              onDelete={() => removeTag(tag)}
              icon={<FaTag className="text-blue-300" />}
            />
          ))}
        </div>
        {tags.length === 0 && (
          <p className="text-gray-500 mt-2">All chips removed! Refresh to reset.</p>
        )}
      </section>

      {/* Different Sizes */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
        <div className="flex flex-wrap items-end gap-3">
          <Chip 
            label="Small" 
            size="sm" 
            color="primary" 
            icon={<FaReact className="h-3 w-3" />} 
          />
          <Chip 
            label="Medium (default)" 
            color="secondary" 
            icon={<FaReact className="h-4 w-4" />} 
          />
          <Chip 
            label="Large" 
            size="lg" 
            color="success" 
            icon={<FaReact className="h-5 w-5" />} 
          />
        </div>
      </section>

      {/* Disabled Chips */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Disabled Chips</h2>
        <div className="flex flex-wrap gap-3">
          <Chip 
            label="Disabled" 
            color="primary" 
            disabled 
          />
          <Chip 
            label="Disabled with Icon" 
            color="secondary" 
            icon={<FaReact />} 
            disabled 
          />
          <Chip 
            label="Disabled Removable" 
            color="error" 
            onDelete={() => {}} 
            disabled 
          />
        </div>
      </section>
    </div>
  );
};

export default ChipTestPage;