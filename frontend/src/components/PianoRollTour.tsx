import React from 'react';
import { Tour, FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface PianoRollTourProps {
  tourOpen: boolean;
  onTourClose: () => void;
  onTourOpen: () => void;
  onTourFinish: () => void;
  instrumentSelectRef: React.RefObject<HTMLDivElement | null>;
  addNoteButtonRef: React.RefObject<HTMLButtonElement | null>;
  trackRollerRef: React.RefObject<HTMLDivElement | null>;
}

const PianoRollTour: React.FC<PianoRollTourProps> = ({
  tourOpen,
  onTourClose,
  onTourOpen,
  onTourFinish,
  instrumentSelectRef,
  addNoteButtonRef,
  trackRollerRef,
}) => {
  const tourSteps = [
    {
      title: 'Welcome to Piano Roll Editor! 🎹',
      description: 'Let\'s take a quick tour to learn how to create music with tracks and notes.',
      target: null,
    },
    {
      title: 'Add Instruments/Tracks',
      description: 'First, select instruments to create tracks. Each instrument becomes a track where you can add notes. You can select multiple instruments.',
      target: () => instrumentSelectRef.current,
      placement: 'bottom',
    },
    {
      title: 'Quick Detail Notes',
      description: 'Use this button to add notes to your tracks with specific time and description through a modal form. Select the track and specify the time.',
      target: () => addNoteButtonRef.current,
      placement: 'bottom',
    },
    {
      title: 'Interactive Piano Roll Grid',
      description: 'This is your main workspace! Each column represents an instrument track, and each row represents time. Click empty cells to add notes, click existing notes to delete them.',
      target: () => trackRollerRef.current,
    },
    {
      title: 'Tips for Using the Grid',
      description: (
        <div>
          <div>• White cells = empty (click to add notes)</div>
          <div>• Colored cells = existing notes (click to delete)</div>
          <div>• Time flows from top to bottom</div>
          <div>• Tracks flow from left to right</div>
        </div>
      ),
      target: () => trackRollerRef.current,
    },
  ];

  return (
    <>
      <Tour
        open={tourOpen}
        onClose={onTourClose}
        steps={tourSteps}
        placement="center"
        onFinish={onTourFinish}
      />

      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24 }}
        onClick={onTourOpen}
        tooltip="Take a guided tour"
      />
    </>
  );
};

export default PianoRollTour;
