import { useState } from 'react';
import { Upload, FileText, X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function AddCaseDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [law1File, setLaw1File] = useState<File | null>(null);
  const [law2File, setLaw2File] = useState<File | null>(null);

  const handleSubmit = () => {
    // Handle case creation
    console.log('Creating case:', { message, law1File, law2File });
    // Reset form
    setMessage('');
    setLaw1File(null);
    setLaw2File(null);
    setOpen(false);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const FileUploadField = ({
    label,
    file,
    setFile,
    id,
  }: {
    label: string;
    file: File | null;
    setFile: (file: File | null) => void;
    id: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <input
          id={id}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileChange(e, setFile)}
        />
        <label
          htmlFor={id}
          className={cn(
            "flex items-center justify-between w-full px-4 py-3.5 rounded-lg border-2 border-dashed transition-all cursor-pointer",
            "hover:border-primary hover:bg-primary/5",
            file ? "border-primary bg-primary/5" : "border-input bg-background"
          )}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {file ? (
              <>
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Choose file or drag here
                </span>
              </>
            )}
          </div>
          {file && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
              }}
              className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-destructive/10 transition-colors"
            >
              <X className="h-4 w-4 text-destructive" />
            </button>
          )}
        </label>
      </div>
      <p className="text-xs text-muted-foreground">
        Supported formats: PDF, DOC, DOCX
      </p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Case
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="px-8 pt-8 pb-6 border-b bg-gradient-subtle">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Add New Case
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground mt-2">
            Upload law documents and provide details to create a new case for analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="px-8 py-6 space-y-6">
          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              Case Description
            </Label>
            <Textarea
              id="message"
              placeholder="Describe the potential contradiction, overlap, or gap you've identified..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Provide detailed information about the case for better analysis.
            </p>
          </div>

          {/* File Upload Fields */}
          <div className="space-y-5">
            <FileUploadField
              label="Upload Law Document 1"
              file={law1File}
              setFile={setLaw1File}
              id="law1"
            />
            <FileUploadField
              label="Upload Law Document 2"
              file={law2File}
              setFile={setLaw2File}
              id="law2"
            />
          </div>
        </div>

        {/* Footer with Action Button */}
        <div className="px-8 py-6 border-t bg-muted/30">
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || !law1File || !law2File}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            Create Case
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
