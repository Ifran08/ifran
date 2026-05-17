import React from 'react';
import { useData } from '../context/DataContext.jsx';

export default function Toast() {
  const { toast } = useData();
  if (!toast) return null;
  return <div className="toast">{toast}</div>;
}