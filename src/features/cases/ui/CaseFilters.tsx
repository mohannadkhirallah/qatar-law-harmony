import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CaseType, CaseStatus } from '@/core/domain/entities/Case';

interface FilterState {
  search: string;
  caseType?: CaseType;
  status?: CaseStatus;
  assignedTo?: string;
  subject?: string;
}

interface CaseFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClear: () => void;
}

export function CaseFilters({ filters, onFilterChange, onClear }: CaseFiltersProps) {
  const activeFilterCount = Object.values(filters).filter(v => v && v !== '').length - (filters.search ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases by ID, document, or keywords..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon" onClick={onClear} disabled={!activeFilterCount}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select
          value={filters.caseType || 'all'}
          onValueChange={(value) => 
            onFilterChange({ ...filters, caseType: value === 'all' ? undefined : value as CaseType })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Case Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value={CaseType.CONTRADICTION}>Contradiction</SelectItem>
            <SelectItem value={CaseType.OVERLAP}>Overlap</SelectItem>
            <SelectItem value={CaseType.GAP}>Gap</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => 
            onFilterChange({ ...filters, status: value === 'all' ? undefined : value as CaseStatus })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value={CaseStatus.NEW}>New</SelectItem>
            <SelectItem value={CaseStatus.UNDER_REVIEW}>Under Review</SelectItem>
            <SelectItem value={CaseStatus.VALIDATED}>Validated</SelectItem>
            <SelectItem value={CaseStatus.REJECTED}>Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.subject || 'all'}
          onValueChange={(value) => 
            onFilterChange({ ...filters, subject: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Subject Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="civil">Civil Legislation</SelectItem>
            <SelectItem value="economic">Economic Legislation</SelectItem>
            <SelectItem value="administrative">Administrative Law</SelectItem>
            <SelectItem value="criminal">Criminal Law</SelectItem>
          </SelectContent>
        </Select>

        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="px-3 py-1.5">
            <Filter className="mr-1 h-3 w-3" />
            {activeFilterCount} active filter{activeFilterCount > 1 ? 's' : ''}
          </Badge>
        )}
      </div>
    </div>
  );
}
