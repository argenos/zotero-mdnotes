all: Makefile.in

-include Makefile.in

# RELEASE:=$(shell grep em:version install.rdf | head -n 1 | sed -e 's/ *<em:version>//' -e 's/<\/em:version>//')
RELEASE:=$(shell git tag --sort version:refname | tail -n 1)
PREVRELEASE:=$(shell git tag --sort version:refname | tail -n 2 | head -n 1)

mdnotes.xpi: FORCE
	rm -rf $@
	yarn build
	zip -r $@ content chrome.manifest defaults locale skin install.rdf update.rdf -x \*.DS_Store

mdnotes-%-fx.xpi: mdnotes.xpi
	mv $< $@

Makefile.in: install.rdf
	echo "all: mdnotes-${RELEASE}-fx.xpi" > Makefile.in

release: mdnotes.xpi
	@mv $< mdnotes-$(RELEASE).xpi
	# Replace old version with new version in install.rdf and update.rdf
	sed -i 's/${PREVRELEASE}/${RELEASE}/g' install.rdf
	sed -i 's/${PREVRELEASE}/${RELEASE}/g' update.rdf
	# Show commits between the last two tags
	# @echo "\nChangelog\n------------"
	@git log --pretty=format:"%s" $(PREVRELEASE)..$(RELEASE) > changelog.md

clean:
	rm -rf *.xpi

FORCE:
