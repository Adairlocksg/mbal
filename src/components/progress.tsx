type ProgressProps = {
  progress: number;
};

const Progress = ({ progress }: ProgressProps) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Progress;
