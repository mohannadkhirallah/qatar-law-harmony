import { useState } from 'react';
import { MessageSquare, Clock, User, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: Date;
}

interface AnnotationSectionProps {
  caseId: string;
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export function AnnotationSection({ caseId, comments, onAddComment }: AnnotationSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments & Annotations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No comments yet. Add your review notes below.
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{comment.author}</p>
                        <Badge variant="outline" className="text-xs">
                          {comment.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {comment.timestamp.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-sm pl-10 leading-relaxed">{comment.text}</p>
                  <Separator />
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="space-y-2">
          <Textarea
            placeholder="Add your comment or recommendation..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={!newComment.trim()}>
              <Send className="mr-2 h-4 w-4" />
              Add Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
