import React from 'react';
import { Modal, Form, Input } from 'antd';

interface CreateSongModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
}

const CreateSongModal: React.FC<CreateSongModalProps> = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onOk(values);
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Create New Song"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Song Name"
          rules={[{ required: true, message: 'Please input the song name!' }]}
        >
          <Input placeholder="Enter song name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea
            placeholder="Enter song description"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          name="totalDuration"
          label="Duration (seconds)"
          rules={[{ required: true, message: 'Please input the duration!' }]}
        >
          <Input
            type="number"
            placeholder="Enter duration in seconds"
            min={1}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSongModal;
