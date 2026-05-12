import React from 'react';
import AchievementsCounter from '@/components/ui/AchievementsCounter';
import { Award, Users, Briefcase, TrendingUp } from 'lucide-react';

const achievements = [
    {
        value: 500,
        label: 'Projetos Entregues',
        suffix: '+',
        icon: <Briefcase className="w-12 h-12" />
    },
    {
        value: 300,
        label: 'Clientes Felizes',
        suffix: '+',
        icon: <Users className="w-12 h-12" />
    },
    {
        value: 10,
        label: 'Anos de Experiência',
        suffix: '+',
        icon: <Award className="w-12 h-12" />
    },
    {
        value: 95,
        label: 'Taxa de Satisfação',
        suffix: '%',
        icon: <TrendingUp className="w-12 h-12" />
    }
];

export default function AchievementsSection() {
    return <AchievementsCounter achievements={achievements} />;
}
