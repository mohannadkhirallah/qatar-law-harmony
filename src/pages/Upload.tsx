import { useState } from 'react';
import { Upload as UploadIcon, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockSubjects } from '@/shared/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function Upload() {
  const { toast } = useToast();
  const [lawNumber, setLawNumber] = useState('');
  const [year, setYear] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Document uploaded successfully',
      description: 'The document is now being processed for analysis.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Document</h1>
        <p className="text-muted-foreground mt-1">Upload a new law or legal document for analysis</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Document Information</CardTitle>
          <CardDescription>Fill in the metadata for the legal document</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lawNumber">Law Number *</Label>
                <Input
                  id="lawNumber"
                  placeholder="e.g., قانون رقم 11"
                  value={lawNumber}
                  onChange={(e) => setLawNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g., 2004"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleAr">Title (Arabic) *</Label>
              <Input
                id="titleAr"
                placeholder="العنوان بالعربية"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                dir="rtl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleEn">Title (English) *</Label>
              <Input
                id="titleEn"
                placeholder="Title in English"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jurisdiction">Jurisdiction *</Label>
                <Input
                  id="jurisdiction"
                  placeholder="e.g., قطر"
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject Category *</Label>
                <Select value={subjectId} onValueChange={setSubjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Document File (PDF) *</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PDF files only (max 50MB)</p>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  className="mt-4"
                  required
                />
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-medium">Processing Information</p>
                <p className="text-muted-foreground">
                  After upload, the system will automatically extract text, identify articles, and trigger
                  contradiction analysis against existing laws.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="shadow-md">
                <FileText className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
