import React from "react";

import { Card } from "@/components/ui/card";

interface University {
	name: string;

	location: string;
}

interface UniversityListProps {
	country: string;

	universities: University[];
}

const UniversityList = ({ country, universities }: UniversityListProps) => {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Universities in {country}</h3>

			<div className="space-y-2">
				{universities.map((university, index) => (
					<Card key={index} className="p-3 hover:bg-accent transition-colors">
						<h4 className="font-medium">{university.name}</h4>

						<p className="text-sm text-muted-foreground">
							{university.location}
						</p>
					</Card>
				))}
			</div>
		</div>
	);
};

export default UniversityList;
