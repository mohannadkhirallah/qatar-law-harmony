import { useState } from 'react';
import { Download, UserPlus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockCases } from '@/shared/data/mockData';
import { CaseFilters } from '@/features/cases/ui/CaseFilters';
import { CaseTable } from '@/features/cases/ui/CaseTable';
import { CaseType, CaseStatus } from '@/core/domain/entities/Case';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface FilterState {
  search: string;
  caseType?: CaseType;
  status?: CaseStatus;
  assignedTo?: string;
  subject?: string;
}

export default function Cases() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
  });
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ search: '' });
    setCurrentPage(1);
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCases(prev =>
      prev.includes(caseId)
        ? prev.filter(id => id !== caseId)
        : [...prev, caseId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedCases(checked ? filteredCases.map(c => c.id) : []);
  };

  const handleBulkAssign = () => {
    console.log('Bulk assign cases:', selectedCases);
    // Implementation for bulk assign
  };

  const handleExport = () => {
    console.log('Export cases');
    // Implementation for export
  };

  // Filter cases based on current filters
  const filteredCases = mockCases.filter(case_ => {
    if (filters.search && !case_.id.toLowerCase().includes(filters.search.toLowerCase()) &&
        !case_.documentIds.some(doc => doc.toLowerCase().includes(filters.search.toLowerCase()))) {
      return false;
    }
    if (filters.caseType && case_.caseType !== filters.caseType) return false;
    if (filters.status && case_.status !== filters.status) return false;
    if (filters.assignedTo && case_.assignedTo !== filters.assignedTo) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  const newCasesCount = mockCases.filter(c => c.status === 'new').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Flagged Cases</h1>
          {newCasesCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                {newCasesCount} new
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {selectedCases.length > 0 && (
            <Button onClick={handleBulkAssign}>
              <UserPlus className="mr-2 h-4 w-4" />
              Assign ({selectedCases.length})
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <CaseFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCases.length)} of {filteredCases.length} cases
          </p>
        </div>

        <CaseTable
          cases={paginatedCases}
          selectedCases={selectedCases}
          onSelectCase={handleSelectCase}
          onSelectAll={handleSelectAll}
        />

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
