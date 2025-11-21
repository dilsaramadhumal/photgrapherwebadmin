// import React from "react";
import { CustomBtn } from "@/components/CustomBtn/CustomBtn";
import { CiBookmarkPlus } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

const ButtonShowcase = () => {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Button Component Showcase</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CustomBtn text="Default" onClick={() => console.log('Default clicked')} />
          <CustomBtn 
            text="Outline" 
            variant="outline" 
            onClick={() => console.log('Outline clicked')} 
          />
          <CustomBtn 
            text="Ghost" 
            variant="ghost" 
            onClick={() => console.log('Ghost clicked')} 
          />
          <CustomBtn 
            text="Link" 
            variant="link" 
            onClick={() => console.log('Link clicked')} 
          />
          <CustomBtn 
            text="Destructive" 
            variant="destructive" 
            onClick={() => console.log('Destructive clicked')} 
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CustomBtn 
            text="Small" 
            size="sm" 
            onClick={() => console.log('Small clicked')} 
          />
          <CustomBtn 
            text="Default" 
            size="default" 
            onClick={() => console.log('Default size clicked')} 
          />
          <CustomBtn 
            text="Large" 
            size="lg" 
            onClick={() => console.log('Large clicked')} 
          />
          <CustomBtn 
            size="icon" 
            onClick={() => console.log('Icon button clicked')}
            startIcon={<IoIosSettings />}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Icons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CustomBtn 
            text="Add Item" 
            startIcon={<CiBookmarkPlus />} 
            onClick={() => console.log('Add Item clicked')} 
          />
          <CustomBtn 
            text="Download" 
            endIcon={<FaDownload />} 
            onClick={() => console.log('Download clicked')} 
          />
          <CustomBtn 
            text="Delete" 
            startIcon={<CiTrash />} 
            variant="destructive" 
            onClick={() => console.log('Delete clicked')} 
          />
          <CustomBtn 
            text="Continue" 
            endIcon={<FaArrowRight />} 
            onClick={() => console.log('Continue clicked')} 
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Colors</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CustomBtn 
            text="Primary" 
            color="#3b82f6" 
            textColor="#ffffff" 
            onClick={() => console.log('Primary clicked')} 
          />
          <CustomBtn 
            text="Success" 
            color="#10b981" 
            textColor="#ffffff" 
            onClick={() => console.log('Success clicked')} 
          />
          <CustomBtn 
            text="Warning" 
            color="#f59e0b" 
            textColor="#000000" 
            onClick={() => console.log('Warning clicked')} 
          />
          <CustomBtn 
            text="Custom Outline" 
            variant="outline" 
            color="#8b5cf6" 
            textColor="#8b5cf6" 
            onClick={() => console.log('Custom Outline clicked')} 
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CustomBtn 
            text="Disabled Default" 
            disabled 
            onClick={() => console.log('This should not fire')} 
          />
          <CustomBtn 
            text="Disabled Outline" 
            variant="outline" 
            disabled 
            onClick={() => console.log('This should not fire')} 
          />
          <CustomBtn 
            text="Disabled Ghost" 
            variant="ghost" 
            disabled 
            onClick={() => console.log('This should not fire')} 
          />
          <CustomBtn 
            text="Disabled Link" 
            variant="link" 
            disabled 
            onClick={() => console.log('This should not fire')} 
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom ClassNames</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <CustomBtn 
            text="Rounded Full" 
            className="rounded-full" 
            onClick={() => console.log('Rounded Full clicked')} 
          />
          <CustomBtn 
            text="Shadow-lg" 
            className="shadow-lg" 
            onClick={() => console.log('Shadow clicked')} 
          />
          <CustomBtn 
            text="Uppercase" 
            className="uppercase" 
            onClick={() => console.log('Uppercase clicked')} 
          />
          <CustomBtn 
            text="Gradient" 
            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white" 
            onClick={() => console.log('Gradient clicked')} 
          />
        </div>
      </section>
    </div>
  );
};

export default ButtonShowcase;