import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <FeatureCard
        icon="🎨"
        title="Professional Tools"
        description="Access brushes, pencils, and advanced drawing tools to bring your ideas to life."
      />
      <FeatureCard
        icon="💾"
        title="Save Your Work"
        description="Never lose your masterpieces. Save and organize your drawings in your personal gallery."
      />
    </div>
  );
};

export default FeaturesSection;
