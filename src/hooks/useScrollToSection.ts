import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useScrollToApply() {
  const navigate = useNavigate();

  return useCallback(() => {
    if (window.location.pathname === '/') {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    navigate('/apply');
  }, [navigate]);
}

export function useScrollToSection(sectionId: string) {
  return useCallback(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, [sectionId]);
}

export function useScrollToSectionFromNav(sectionId: string) {
  const navigate = useNavigate();

  return useCallback(() => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    navigate(sectionId === 'hiw' ? '/how-it-works' : '/');
  }, [navigate, sectionId]);
}
