import { useState } from 'react';
import { FileText, Search, Filter, Download, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockDocuments, mockSubjects } from '@/shared/data/mockData';
import { DocumentStatus } from '@/core/domain/entities/Document';

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.ACTIVE:
        return 'default';
      case DocumentStatus.PROCESSING:
        return 'secondary';
      case DocumentStatus.DRAFT:
        return 'outline';
      case DocumentStatus.ARCHIVED:
        return 'destructive';
    }
  };

  const getSubjectName = (subjectId: string) => {
    const subject = mockSubjects.find(s => s.id === subjectId);
    return subject?.nameEn || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground mt-1">Browse and manage legal documents</p>
        </div>
        <Button className="shadow-md">
          <FileText className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by law number, title, year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {mockDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-semibold">{doc.titleEn}</h3>
                      <p className="text-sm text-muted-foreground font-arabic">{doc.titleAr}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{doc.lawNumber}</span>
                        <span>•</span>
                        <span>{doc.year}</span>
                        <span>•</span>
                        <span>{doc.articleCount} articles</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    <Badge variant="outline">
                      {getSubjectName(doc.subjectId)}
                    </Badge>
                    <Badge variant="outline">
                      Version {doc.version}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
