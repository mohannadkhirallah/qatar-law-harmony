import { useState } from 'react';
import { Eye, MoreVertical, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Case, CaseType, CaseStatus } from '@/core/domain/entities/Case';

interface CaseTableProps {
  cases: Case[];
  selectedCases: string[];
  onSelectCase: (caseId: string) => void;
  onSelectAll: (checked: boolean) => void;
}

export function CaseTable({ cases, selectedCases, onSelectCase, onSelectAll }: CaseTableProps) {
  const navigate = useNavigate();

  const getCaseTypeColor = (type: CaseType) => {
    switch (type) {
      case CaseType.CONTRADICTION:
        return 'destructive';
      case CaseType.OVERLAP:
        return 'default';
      case CaseType.GAP:
        return 'secondary';
    }
  };

  const getCaseStatusColor = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.NEW:
        return 'default';
      case CaseStatus.UNDER_REVIEW:
        return 'secondary';
      case CaseStatus.VALIDATED:
        return 'outline';
      case CaseStatus.REJECTED:
        return 'destructive';
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatCaseType = (type: CaseType) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
  };

  const formatStatus = (status: CaseStatus) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const allSelected = cases.length > 0 && selectedCases.length === cases.length;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onSelectAll}
                aria-label="Select all cases"
              />
            </TableHead>
            <TableHead>Case ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Flagged Date</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((case_) => (
            <TableRow key={case_.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedCases.includes(case_.id)}
                  onCheckedChange={() => onSelectCase(case_.id)}
                  aria-label={`Select case ${case_.id}`}
                />
              </TableCell>
              <TableCell className="font-mono text-sm">#{case_.id}</TableCell>
              <TableCell>
                <Badge variant={getCaseTypeColor(case_.caseType)}>
                  {formatCaseType(case_.caseType)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getCaseStatusColor(case_.status)}>
                  {formatStatus(case_.status)}
                </Badge>
              </TableCell>
              <TableCell>
                {case_.severity && (
                  <Badge variant={getSeverityColor(case_.severity)}>
                    {case_.severity}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {case_.documentIds.slice(0, 2).join(', ')}
                {case_.documentIds.length > 2 && ` +${case_.documentIds.length - 2}`}
              </TableCell>
              <TableCell className="text-sm">
                {case_.flaggedDate.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-sm">
                {case_.assignedTo ? `Reviewer #${case_.assignedTo}` : (
                  <span className="text-muted-foreground">Unassigned</span>
                )}
              </TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/cases/${case_.id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign
                      </DropdownMenuItem>
                      <DropdownMenuItem>Change Status</DropdownMenuItem>
                      <DropdownMenuItem>Add Comment</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
