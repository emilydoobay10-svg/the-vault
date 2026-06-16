import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useScrollToApply() {
  const navigate = useNavigate();

  return useCallback(() => {
    const scrollToApply = () => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (window.location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scrollToApply, 100);
      return;
    }

    scrollToApply();
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
    const scroll = () => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    if (window.location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scroll, 100);
      return;
    }

    scroll();
  }, [navigate, sectionId]);
}
