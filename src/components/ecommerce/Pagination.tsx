import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    loading: boolean;
}

export const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    loading,
}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-between border-t px-4 py-3 sm:px-6 w-full pt-6 mt-8">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> to{' '}
                        <span className="font-medium">
                            {Math.min(currentPage * itemsPerPage, totalItems)}
                        </span>{' '}
                        of <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Button
                            variant="outline"
                            className="rounded-l-md rounded-r-none px-2 py-2 focus:z-20 border-r-0"
                            onClick={handlePrevious}
                            disabled={currentPage === 1 || loading}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </Button>

                        <div className="hidden md:flex">
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 border-y border-input hover:bg-muted/50 focus:z-20">
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>

                        <Button
                            variant="outline"
                            className="rounded-l-none rounded-r-md px-2 py-2 focus:z-20"
                            onClick={handleNext}
                            disabled={currentPage === totalPages || loading}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </Button>
                    </nav>
                </div>
            </div>

            {/* Mobile view */}
            <div className="flex flex-1 justify-between sm:hidden">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentPage === 1 || loading}
                >
                    Previous
                </Button>
                <span className="text-sm text-gray-700 self-center">
                    {currentPage} / {totalPages}
                </span>
                <Button
                    variant="outline"
                    onClick={handleNext}
                    disabled={currentPage === totalPages || loading}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};
