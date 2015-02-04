@echo off

set git_path=%1
set output_file=%2

cd %git_path%
git tag > %output_file%