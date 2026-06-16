import { useMemo, useState } from 'react';

export interface CalculatorValues {
  groupSize: number;
  spendPerPerson: number;
  groupsLeaving: number;
}

export function useRevenueCalculator(initial: CalculatorValues = {
  groupSize: 4,
  spendPerPerson: 20,
  groupsLeaving: 5,
}) {
  const [values, setValues] = useState(initial);

  const labels = useMemo(
    () => ({
      groupSize: `${values.groupSize} people`,
      spendPerPerson: `$${values.spendPerPerson}`,
      groupsLeaving: `${values.groupsLeaving} groups`,
    }),
    [values],
  );

  const result = useMemo(
    () => values.groupSize * values.spendPerPerson * values.groupsLeaving,
    [values],
  );

  return {
    values,
    labels,
    result,
    setGroupSize: (groupSize: number) => setValues((current) => ({ ...current, groupSize })),
    setSpendPerPerson: (spendPerPerson: number) =>
      setValues((current) => ({ ...current, spendPerPerson })),
    setGroupsLeaving: (groupsLeaving: number) =>
      setValues((current) => ({ ...current, groupsLeaving })),
  };
}
