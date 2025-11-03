import { HelpCircle, Book, Video, MessageCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Help() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help & Training</h1>
        <p className="text-muted-foreground mt-1">User guides, documentation, and support</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">User Guide</h3>
              <p className="text-sm text-muted-foreground">Comprehensive system documentation</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">Step-by-step training videos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Get help from our team</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I upload a new law document?</AccordionTrigger>
              <AccordionContent>
                Navigate to the Upload page, fill in the document metadata (law number, year, title, subject),
                and upload the PDF file. The system will automatically extract and analyze the content.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What types of cases does the system flag?</AccordionTrigger>
              <AccordionContent>
                The AI system identifies three types of issues: Contradictions (conflicting provisions),
                Overlaps (redundant or similar provisions), and Gaps (missing coverage areas).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do I review and validate a case?</AccordionTrigger>
              <AccordionContent>
                Go to the Cases page, select a case to review, examine the flagged articles side-by-side,
                add your comments and recommendation, then mark it as validated or rejected.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I export reports?</AccordionTrigger>
              <AccordionContent>
                Yes, use the Reports section to export case data in Excel or generate comprehensive
                PDF reports. You can also schedule recurring reports.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I change the interface language?</AccordionTrigger>
              <AccordionContent>
                Click the language switcher in the header or go to Settings → Localization to
                choose between Arabic and English interfaces.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What are the different user roles?</AccordionTrigger>
              <AccordionContent>
                There are four roles: Admin (full system control), Legal Analyst (upload and review),
                Reviewer (approve/reject reports), and Viewer (read-only access).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-medium">November 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Support Email:</span>
            <span className="font-medium">support@justice.gov.qa</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
