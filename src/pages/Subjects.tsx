import { FileStack, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockSubjects } from '@/shared/data/mockData';

export default function Subjects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subject Taxonomy</h1>
          <p className="text-muted-foreground mt-1">Manage legal subject categories</p>
        </div>
        <Button className="shadow-md">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockSubjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${subject.color}20` }}
                >
                  <FileStack className="h-6 w-6" style={{ color: subject.color }} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{subject.nameEn}</h3>
                    <p className="text-sm text-muted-foreground font-arabic">{subject.nameAr}</p>
                  </div>
                  {subject.description && (
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">ID: {subject.id}</Badge>
                    {subject.parentId && (
                      <Badge variant="secondary">Child category</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
